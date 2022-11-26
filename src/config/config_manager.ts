// Copyright 2022
// Carlos Alberto Ruiz Naranjo [carlosruiznaranjo@gmail.com]
//
// This file is part of colibri2
//
// Colibri is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Colibri is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with colibri2.  If not, see <https://www.gnu.org/licenses/>.

import { get_default_config, e_config, e_tools_general_select_tool, e_linter_general_linter_vhdl, e_linter_general_linter_verilog, e_linter_general_lstyle_vhdl, e_linter_general_lstyle_verilog } from './config_declaration';
import * as cfg_aux from "./auxiliar_config";

export class Config_manager {
    private config: e_config = get_default_config();

    public set_config(new_config: e_config) {
        this.config = new_config;
    }

    public get_config(): e_config {
        return this.config;
    }

    public get_vhdl_linter_name() {
        return this.config.linter.general.linter_vhdl;
    }

    public get_verilog_linter_name() {
        return this.config.linter.general.linter_verilog;
    }

    public get_vhdl_style_linter_name() {
        return this.config.linter.general.lstyle_vhdl;
    }

    public get_verilog_style_linter_name() {
        return this.config.linter.general.lstyle_verilog;
    }

    public get_linter_config_vhdl(): string {
        const linter_name = this.config.linter.general.linter_vhdl;
        if (linter_name === e_linter_general_linter_vhdl.ghdl) {
            return this.config.linter.ghdl.arguments;
        }
        else if (linter_name === e_linter_general_linter_vhdl.modelsim) {
            return this.config.linter.modelsim.vhdl_arguments;
        }
        else if (linter_name === e_linter_general_linter_vhdl.vivado) {
            return this.config.linter.vivado.vhdl_arguments;
        }
        else {
            return "";
        }
    }

    public get_linter_config_verilog(): string {
        const linter_name = this.config.linter.general.linter_verilog;
        if (linter_name === e_linter_general_linter_verilog.icarus) {
            return this.config.linter.icarus.arguments;
        }
        else if (linter_name === e_linter_general_linter_verilog.modelsim) {
            return this.config.linter.modelsim.verilog_arguments;
        }
        else if (linter_name === e_linter_general_linter_verilog.verilator) {
            return this.config.linter.verilator.arguments;
        }
        else if (linter_name === e_linter_general_linter_verilog.vivado) {
            return this.config.linter.vivado.verilog_arguments;
        }
        else {
            return "";
        }
    }

    public get_style_linter_config_vhdl(): string {
        const linter_name = this.config.linter.general.lstyle_vhdl;
        if (linter_name === e_linter_general_lstyle_vhdl.vsg) {
            return this.config.linter.vsg.arguments;
        }
        else {
            return "";
        }
    }

    public get_style_linter_config_verilog(): string {
        const linter_name = this.config.linter.general.lstyle_verilog;
        if (linter_name === e_linter_general_lstyle_verilog.verible) {
            return this.config.linter.verible.arguments;
        }
        else {
            return "";
        }
    }

    public get_exec_config(): cfg_aux.t_exec_config {
        const exec_config: cfg_aux.t_exec_config = {
            execution_mode: this.config.tools.general.execution_mode,
            python_path: this.config.general.general.pypath,
            developer_mode: this.config.general.general.developer_mode,
            waveform_viewer: this.config.tools.general.waveform_viewer
        };
        return exec_config;
    }

    public get_template_config(): cfg_aux.t_template_options {
        const options: cfg_aux.t_template_options = {
            header_file_path: this.config.templates.general.header_file_path,
            indent_char: this.config.templates.general.indent,
            clock_generation_style: this.config.templates.general.clock_generation_style,
            instance_style: this.config.templates.general.instance_style
        };
        return options;
    }

    public get_documenter_config(): cfg_aux.t_documenter_options {
        const options: cfg_aux.t_documenter_options = {
            generic_visibility: this.config.documentation.general.generics,
            port_visibility: this.config.documentation.general.ports,
            signal_visibility: this.config.documentation.general.signals,
            constant_visibility: this.config.documentation.general.constants,
            type_visibility: this.config.documentation.general.types,
            function_visibility: this.config.documentation.general.functions,
            instantiation_visibility: this.config.documentation.general.instantiations,
            process_visibility: this.config.documentation.general.process,
            language: this.config.documentation.general.language,
            vhdl_symbol: this.config.documentation.general.symbol_vhdl,
            verilog_symbol: this.config.documentation.general.symbol_verilog,
            enable_fsm: this.config.documentation.general.fsm
        };
        return options;
    }

    public get_tool_options(): cfg_aux.t_tool_options {
        const tool_name = this.config.tools.general.select_tool;
        const tool_config = this.config.tools[tool_name];
        const tool_options: cfg_aux.t_tool_options = {
            name: this.config.tools.general.select_tool,
            installation_path: tool_config['installation_path'],
            config: tool_config
        };
        return tool_options;
    }

    public get_tool_name(): e_tools_general_select_tool {
        return this.config.tools.general.select_tool;
    }
}

export function merge_configs(general_config: e_config | undefined, secondary_config: e_config) {
    if (general_config === undefined) {
        return secondary_config;
    }
    return general_config;
}