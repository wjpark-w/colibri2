import { Command, Flags } from '@oclif/core';
import * as path_lib from 'path';
import * as file_utils from '../../utils/file_utils';
import * as command_utils from '../../utils/command_utils';
import * as printer from '../../utils/printer';
import { Linter } from "../../linter/linter";
import * as linter_common from '../../linter/common';
import * as logger from '../../logger/logger';

function get_linters(): string[] {
    const key_list = Object.values(linter_common.LINTER_NAME);
    return key_list;
}

type i_error = {
    ruleId: string;
    severity: number;
    message: string;
    line: number;
    column: number;
    nodeType: string;
    messageId: string;
    endLine: number;
    endColumn: number;
}

type i_file_error = {
    filePath: string;
    messages: i_error[];
    errorCount: number;
    fatalErrorCount: number;
    warningCount: number;
    fixableErrorCount: number;
    fixableWarningCount: number;
    source: string
}

function get_norm_error(filename: string, error_list: linter_common.l_error[])
    : i_file_error {

    const i_file_error: i_file_error = {
        filePath: filename,
        messages: [],
        errorCount: 0,
        fatalErrorCount: 0,
        warningCount: 0,
        fixableErrorCount: 0,
        fixableWarningCount: 0,
        source: ''
    };

    let error_count = 0;
    let warning_count = 0;
    error_list.forEach(error_inst => {
        let severity = 0;
        if (error_inst.severity === linter_common.LINTER_ERROR_SEVERITY.ERROR) {
            severity = 2;
            ++error_count;
        }
        else {
            severity = 1;
            ++warning_count;
        }

        const error_norm: i_error = {
            ruleId: error_inst.description,
            severity: severity,
            message: error_inst.description,
            line: error_inst.location.position[0] + 1,
            column: error_inst.location.position[1],
            nodeType: '',
            messageId: '',
            endLine: error_inst.location.position[0],
            endColumn: error_inst.location.position[1] + 1
        };
        i_file_error.messages.push(error_norm);
    });
    i_file_error.errorCount = error_count;
    i_file_error.warningCount = warning_count;
    return i_file_error;
}

function create_report(error_list: i_file_error[], output_path: string) {
    const detailed = require('../../reporter/detailed');
    const template = detailed(error_list, false);

    file_utils.save_file_sync(output_path, template);
}


function print_summary(error_list: i_file_error[]) {
    const title = "Summary";
    const column_title = ["File", "Warnings", "Errors"];
    const column_color = ["white", "yellow", "red"];
    const row_list: any[] = [];

    error_list.forEach(error_inst => {
        const row = [error_inst.filePath, error_inst.warningCount, error_inst.errorCount];
        row_list.push(row);
    });
    printer.print_table(title, column_title, column_color, row_list);
}

function print_error_table(error_file: i_file_error) {
    // eslint-disable-next-line no-console
    console.log();
    const title = `Errors report for ${file_utils.get_filename(error_file.filePath)}`;
    const column_title = ["Severty", "Description"];
    const column_color = ["white", "green"];
    const row_list: any[] = [];

    const message_list = error_file.messages;

    const error_list: any[] = [];
    const warning_list: any[] = [];
    message_list.forEach(message_inst => {
        if (message_inst.severity !== 0) {
            error_list.push(message_inst);
        }
        else {
            warning_list.push(message_inst);
        }
    });

    const complete_list = warning_list.concat(error_list);
    complete_list.forEach(error_inst => {
        let severity = 'warning';
        if (error_inst.severity !== 0) {
            severity = 'error';
        }
        const row = [severity, error_inst.message];
        row_list.push(row);
    });

    printer.print_table(title, column_title, column_color, row_list);
}


function print_report(error_list: i_file_error[]) {
    print_summary(error_list);
    error_list.forEach(error_inst => {
        print_error_table(error_inst);
    });
}


export default class MyCLI extends Command {
    static description = 'Check errors in HDL files.';

    static flags = {
        input: Flags.string({
            char: 'i',
            description: 'Path CSV with a list of files or glob pattern. E.g: --input "/mypath/*.vhd"',
            hidden: false,
            multiple: false,
            required: true,
            default: ''
        }),
        output: Flags.string({
            char: 'o',
            description: 'Output report path. E.g: report.html',
            hidden: false,
            multiple: false,
            required: false,
            default: ''
        }),
        linter: Flags.string({
            description: 'Linter name',
            hidden: false,
            multiple: false,
            required: true,
            options: get_linters(),
            default: "ghdl"
        }),
        "linter-path": Flags.string({
            description: 'Directory to the location where tool binary is located. Empty to use the system path.',
            hidden: false,
            multiple: false,
            required: false,
            default: ""
        }),
        "linter-arguments": Flags.string({
            description: 'Arguments passed to the linter.',
            hidden: false,
            multiple: false,
            required: false,
            default: ""
        }),

        silent: Flags.boolean({
            char: 's',
            description: 'Silent mode',
            hidden: false,
            default: false,
            required: false,
        }),
        verbose: Flags.boolean({
            char: 'v',
            description: 'Verbose mode',
            hidden: false,
            default: false,
            required: false,
        }),
    };

    async run(): Promise<void> {
        const { flags } = await this.parse(MyCLI);

        const input_path = flags.input;
        let output_path = flags.output;
        const linter_name = flags.linter;
        const linter_path = flags['linter-path'];
        const linter_arguments = flags['linter-arguments'];
        const silent = flags.silent;
        const verbose = flags.verbose;

        if (verbose === true) {
            logger.Logger.set_mode(logger.LOG_MODE.STDOUT);
        }
        else {
            logger.Logger.set_mode(logger.LOG_MODE.SILENT);
        }

        const cmd_current_dir = command_utils.get_current_directory();

        //Input
        const hdl_file_list = await command_utils.get_files_from_input(input_path, cmd_current_dir);

        //Output file
        if (output_path !== '') {
            if (file_utils.check_if_path_exist(output_path) && file_utils.check_if_file(output_path) === false) {
                output_path = path_lib.join(cmd_current_dir, 'report.html');
            }

            output_path = file_utils.get_full_path(output_path);
            const output_directory = file_utils.get_directory(output_path);
            if (file_utils.check_if_path_exist(output_directory) === false) {
                printer.print_msg(`Output file folder "${output_directory}" doesn't exist.`, printer.T_LOG_LEVEL.ERROR);
                this.exit(-1);
            }
        }

        const linter_manager = new Linter(linter_name);
        const linter_options: linter_common.l_options = {
            path: linter_path,
            argument: linter_arguments
        };

        const error_list_end: i_file_error[] = [];
        for (let i = 0; i < hdl_file_list.length; i++) {
            const hdl_file = hdl_file_list[i];
            const error_list = await linter_manager.lint_from_file(hdl_file.filename, linter_options);
            const const_error_list_norm = get_norm_error(hdl_file.filename, error_list);
            error_list_end.push(const_error_list_norm);
        }
        if (output_path !== '') {
            create_report(error_list_end, output_path);
        }
        if (silent === false) {
            print_report(error_list_end);
        }
    }
}
