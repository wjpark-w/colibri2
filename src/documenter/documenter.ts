// Copyright 2022 
// Carlos Alberto Ruiz Naranjo [carlosruiznaranjo@gmail.com]
// Ismael Perez Rojo [ismaelprojo@gmail.com ]
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

import * as fs from 'fs';
import * as path_lib from 'path';
import * as section_creator from './section_creator';
import * as common_documenter from "./common";
import * as common_hdl from "../parser/common";
import { HDL_LANG } from "../common/general";
import * as parser_lib from "../parser/factory";
import * as css_const_style from "./css";
import { t_documenter_options } from "../config/auxiliar_config";

type result_type = {
    document: string;
    error: boolean;
};

export class Documenter extends section_creator.Creator {
    private init_parser = false;
    private vhdl_parser: any;
    private verilog_parser: any;

    constructor() {
        super();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Save
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async save_document(code: string, lang: HDL_LANG, configuration: t_documenter_options,
        input_path: string, output_path: string, output_type: common_documenter.doc_output_type): Promise<boolean> {

        if (output_type === common_documenter.doc_output_type.SVG) {
            return this.save_svg(code, lang, configuration, output_path);
        }
        else {
            const output_dir = path_lib.dirname(output_path);
            const result = await this.get_document(code, lang, configuration, true, input_path, output_dir, false,
                output_type);

            if (result.error === false) {
                fs.writeFileSync(output_path, result.document);
            }
            return result.error;
        }
    }

    async save_svg(code: string, lang: HDL_LANG, configuration: t_documenter_options,
        path: string): Promise<boolean> {

        const hdl_element = await this.get_code_tree(code, lang, configuration);
        if (hdl_element === undefined) {
            return false;
        }
        // Diagram
        const svg_diagram_str = await this.get_diagram_svg_from_code_tree(hdl_element);
        await fs.writeFileSync(path, svg_diagram_str);
        //FSM
        const fsm_list = this.get_fsm(code, lang, configuration);
        await this.save_fsm(fsm_list, hdl_element, path);
        // await this.save_wavedrom(code_tree, path);
        return true;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Get document
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async get_document(code: string, lang: HDL_LANG, configuration: t_documenter_options,
        save: boolean, input_path: string, output_svg_dir: string, extra_top_space: boolean,
        output_type: common_documenter.doc_output_type): Promise<result_type> {

        // const svg_dir_path = path_lib.dirname(output_svg_dir);
        // const filename_svg = path_lib.basename(input_path, path_lib.extname(input_path));

        const hdl_element: common_hdl.Hdl_element = await this.get_code_tree(code, lang, configuration);
        if (hdl_element === undefined) {
            const result: result_type = {
                document: '',
                error: true
            };
            return result;
        }

        ////////////////////////////////////////////////////////////////////////
        // HTML preparation
        ////////////////////////////////////////////////////////////////////////
        let html_style = '';
        if (save) {
            html_style = `<div id="teroshdl" class='templateTerosHDL'>\n`;
            html_style = css_const_style.html_style_save + html_style;
        }
        else {
            // eslint-disable-next-line max-len
            html_style = `<div id="teroshdl" class='templateTerosHDL' style="overflow-y:auto;height:100%;width:100%">\n`;
            html_style = '';
            html_style = css_const_style.html_style_preview + html_style;
        }
        let html = html_style;
        if (extra_top_space) {
            html += "<br><br>\n";
        }
        ////////////////////////////////////////////////////////////////////////
        // Document preparation
        ////////////////////////////////////////////////////////////////////////
        let document = "";
        if (output_type === common_documenter.doc_output_type.HTML) {
            document = html;
        }
        ////////////////////////////////////////////////////////////////////////
        // Title section
        ////////////////////////////////////////////////////////////////////////
        document += this.get_title_section(hdl_element, configuration, output_type);
        ////////////////////////////////////////////////////////////////////////
        // Input path section
        ////////////////////////////////////////////////////////////////////////
        document += this.get_input_section(input_path, configuration, output_type);
        ////////////////////////////////////////////////////////////////////////
        // Info section
        ////////////////////////////////////////////////////////////////////////
        document += this.get_info_section(hdl_element, configuration, output_type);
        ////////////////////////////////////////////////////////////////////////
        // Custom section begin
        ////////////////////////////////////////////////////////////////////////
        document += this.get_custom_section('custom_section_begin', hdl_element, input_path, output_type);
        ////////////////////////////////////////////////////////////////////////
        // Diagram
        ////////////////////////////////////////////////////////////////////////
        document += this.get_diagram_section(hdl_element, configuration, output_svg_dir, output_type);
        ////////////////////////////////////////////////////////////////////////
        // Description
        ////////////////////////////////////////////////////////////////////////
        document += this.get_description_section(hdl_element, configuration, output_svg_dir, output_type);
        ////////////////////////////////////////////////////////////////////////
        // Interface section
        ////////////////////////////////////////////////////////////////////////
        document += this.get_interface_section(hdl_element, configuration, output_type);
        ////////////////////////////////////////////////////////////////////////
        // Generic and port
        ////////////////////////////////////////////////////////////////////////
        document += this.get_in_out_section(hdl_element, configuration, output_type);
        ////////////////////////////////////////////////////////////////////////
        // Signal and constant
        ////////////////////////////////////////////////////////////////////////
        document += this.get_signal_constant_section(hdl_element, configuration, output_type);
        ////////////////////////////////////////////////////////////////////////
        // Function
        ////////////////////////////////////////////////////////////////////////
        document += this.get_function_section(hdl_element, configuration, output_type);
        ////////////////////////////////////////////////////////////////////////
        // Processes
        ////////////////////////////////////////////////////////////////////////
        document += this.get_process_section(hdl_element, configuration, output_type);
        ////////////////////////////////////////////////////////////////////////
        // Instantiation
        ////////////////////////////////////////////////////////////////////////
        document += this.get_instantiation_section(hdl_element, configuration, output_type);
        ////////////////////////////////////////////////////////////////////////
        // State machine
        ////////////////////////////////////////////////////////////////////////
        const fsm_list = await this.get_fsm(code, lang, configuration);
        document += this.get_fsm_section(fsm_list, hdl_element, configuration, output_svg_dir, output_type);
        ////////////////////////////////////////////////////////////////////////
        // Custom section end
        ////////////////////////////////////////////////////////////////////////
        document += this.get_custom_section('custom_section_end', hdl_element, input_path, output_type);
        ////////////////////////////////////////////////////////////////////////
        // Interface section
        ////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////
        // End
        ////////////////////////////////////////////////////////////////////////
        if (output_type === common_documenter.doc_output_type.HTML) {
            document += `
    </article class="markdown-body">
    </body>
    `;
        }
        const result: result_type = {
            document: document,
            error: false
        };
        return result;
    }
    ////////////////////////////////////////////////////////////////////////////
    // Parsers
    ////////////////////////////////////////////////////////////////////////////
    private async get_code_tree(code: string, lang: HDL_LANG, configuration: t_documenter_options) {
        const parser = await this.get_parser(lang);
        let symbol = configuration.verilog_symbol;
        if (lang === HDL_LANG.VHDL) {
            symbol = configuration.vhdl_symbol;
        }
        const code_tree = await parser.get_all(code, symbol);
        return code_tree;
    }

    private async init() {
        await this.create_parser(HDL_LANG.VERILOG);
        await this.create_parser(HDL_LANG.VHDL);
        this.init_parser = true;
    }

    private async get_parser(lang: HDL_LANG) {
        if (this.init_parser === false) {
            await this.init();
        }

        if (lang === HDL_LANG.VHDL) {
            return this.vhdl_parser;
        }
        else {
            return this.verilog_parser;
        }
    }

    private async create_parser(lang: HDL_LANG) {
        const parser_factory = new parser_lib.Factory();
        if (lang === HDL_LANG.VHDL) {
            this.vhdl_parser = await parser_factory.get_parser(lang);
        }
        else {
            this.verilog_parser = await parser_factory.get_parser(lang);
        }
    }

    private async get_fsm(code: string, lang: HDL_LANG, configuration: t_documenter_options) {
        let symbol = configuration.verilog_symbol;
        if (lang === HDL_LANG.VHDL) {
            symbol = configuration.vhdl_symbol;
        }
        const parser = await this.get_parser(lang);
        const fsm_list = await parser.get_svg_sm(code, symbol);
        return fsm_list.svg;
    }
}