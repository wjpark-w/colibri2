import { Command, Flags } from '@oclif/core';
import * as file_utils from '../../utils/file_utils';
import * as command_utils from '../../utils/command_utils';
import * as printer from '../../utils/printer';
import * as formatter_common from '../../formatter/common';
import { Formatter } from '../../formatter/formatter';
import * as logger from '../../logger/logger';

function get_formatters(): string[] {
    const key_list = Object.values(formatter_common.FORMATTER_NAME);
    return key_list;
}

type i_result = {
    filename: string;
    error: boolean;
    code: string;
    formatted_code: string;
}

function print_report(error_list: i_result[]) {
    const title = "Summary";
    const column_title = ["File", "Result"];
    const column_color = ["white", "white"];
    const row_list: any[] = [];

    error_list.forEach(error_inst => {
        let result_fail = 'PASS';
        if (error_inst.error === true) {
            result_fail = 'NOT PASS';
        }
        const row = [error_inst.filename, result_fail];
        row_list.push(row);
    });
    printer.print_table(title, column_title, column_color, row_list);
}

function get_standalone_vhdl_options(_config_path: string) {
    const config: formatter_common.standalone_vhdl_options = {
        remove_comments: false,
        remove_asserts: false,
        remove_report: false,
        check_alias: false,
        align_comments: false,
        sign_align_settings: {
            is_regional: false,
            is_all: false,
            mode: formatter_common.ALIGN_MODE.LOCAL,
            keyWords: []
        },
        keyword_case: formatter_common.LETTER_CASE.LOWERCASE,
        type_name_case: formatter_common.LETTER_CASE.LOWERCASE,
        indentation: '  ',
        new_line_settings: {
            new_line_after: [],
            no_new_line_after: []
        },
        end_of_line: '\n'
    }
    return config;
}

function get_istyle_options(_config_path: string) {
    const config: formatter_common.istyle_options = {
        style: formatter_common.istyle_style.ANSI,
        indent_size: 2
    };
    return config;
}

function get_s3sv_options(_config_path: string, python_path: string) {
    const config: formatter_common.s3sv_options = {
        python3_path: python_path,
        use_tabs: false,
        indent_size: 2,
        one_bind_per_line: false,
        one_decl_per_line: false
    }
    return config;
}


function get_verible_options(_config_path: string) {
    const config: formatter_common.verible_options = {
        path: '',
        arguments: ''
    }
    return config;
}

function get_options(formatter_name: string, config_path: string, python_path: string) {
    if (formatter_name === formatter_common.FORMATTER_NAME.ISTYLE) {
        return get_istyle_options(config_path);
    }
    else if (formatter_name === formatter_common.FORMATTER_NAME.S3SV) {
        return get_s3sv_options(config_path, python_path);
    }
    else if (formatter_name === formatter_common.FORMATTER_NAME.STANDALONE_VHDL) {
        return get_standalone_vhdl_options(config_path);
    }
    else {
        return get_verible_options(config_path);
    }
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
        formatter: Flags.string({
            description: 'Formatter name',
            hidden: false,
            multiple: false,
            required: true,
            options: get_formatters(),
            default: "standalone_vhdl"
        }),
        mode: Flags.string({
            description: 'Opeation mode. Format and save the formatted code or only check',
            hidden: false,
            multiple: false,
            required: false,
            options: ["only-check", "format"],
            default: "only-check"
        }),
        "python-path": Flags.string({
            description: 'Python path. Empty to use the system path.',
            hidden: false,
            multiple: false,
            required: false,
            default: ""
        }),
        "formatter-arguments": Flags.string({
            description: 'Arguments passed to the formatter.',
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
        const mode = flags.mode;
        const formatter_name = flags.formatter;
        const python_path = flags['python-path'];
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

        const formatter_manager = new Formatter(formatter_name);
        const formatter_options = get_options(formatter_name, "", python_path);

        const result_list: any[] = [];
        for (let i = 0; i < hdl_file_list.length; i++) {
            const hdl_file = hdl_file_list[i];
            const filename = hdl_file.filename;
            const current_code = file_utils.read_file_sync(filename);
            const formatted_code =
                (await formatter_manager.format_from_code(current_code, formatter_options)).code_formatted;
            let error = false;
            if (current_code !== formatted_code) {
                error = true;
            }

            const result: i_result = {
                filename: filename,
                error: error,
                code: current_code,
                formatted_code: formatted_code
            };
            result_list.push(result);

            if (mode === "format") {
                file_utils.save_file_sync(filename, formatted_code, false);
            }
        }
        if (silent === false) {
            print_report(result_list);
        }
    }
}
