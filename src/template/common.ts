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
import { HDL_LANG } from "../common/general";

/** Templates types for VHDL */
export class TEMPLATE_NAME_VHDL {
    static readonly COCOTB = {
        id: "cocotb",
        description: "cocotb"
    };

    static readonly TESTBENCH_NORMAL = {
        id: "testbench_normal",
        description: "Verilog testbench"
    };
    static readonly TESTBENCH_VUNIT = {
        id: "testbench_vunit",
        description: "VUnit testbench"
    };

    static readonly HDL_ELEMENT_COMPONENT = {
        id: "hdl_element_component",
        description: "Copy as component"
    };
    static readonly HDL_ELEMENT_INSTANCE = {
        id: "hdl_element_instance",
        description: "Copy as instance"
    };
    static readonly HDL_ELEMENT_SIGNAL = {
        id: "hdl_element_signal",
        description: "Copy as signal"
    };

    static readonly HDL_ELEMENT_MIX_INSTANCE = {
        id: "hdl_element_mix_instance",
        description: "Copy as Verilog instance"
    };
    static readonly HDL_ELEMENT_MIX_TESTBENCH_NORMAL = {
        id: "hdl_element_mix_testbench_normal",
        description: "Copy as Verilog testbench"
    };
    static readonly HDL_ELEMENT_MIX_TESTBENCH_VUNIT = {
        id: "hdl_element_mix_testbench_vunit",
        description: "Copy as Verilog VUnit testbench"
    };

    // private to disallow creating other instances of this type
    private constructor(private readonly key: string, public readonly value: any) {
    }

    toString() {
        return this.key;
    }
}

/** Templates types for Verilog/SV */
export class TEMPLATE_NAME_VERILOG {
    static readonly COCOTB = {
        id: "cocotb",
        description: "cocotb"
    };
    static readonly TESTBENCH_NORMAL = {
        id: "testbench_normal",
        description: "Verilog testbench"
    };
    static readonly TESTBENCH_VUNIT = {
        id: "testbench_vunit",
        description: "Vunit testbench"
    };
    static readonly HDL_ELEMENT_INSTANCE = {
        id: "testbench_vunit",
        description: "Copy as instance"
    };
    static readonly HDL_ELEMENT_SIGNAL = {
        id: "hdl_element_signal",
        description: "Copy as signal"
    };

    static readonly HDL_ELEMENT_MIX_INSTANCE = {
        id: "hdl_element_mix_instance",
        description: "Copy as VHDL instance"
    };
    static readonly HDL_ELEMENT_MIX_TESTBENCH_NORMAL = {
        id: "hdl_element_mix_testbench_normal",
        description: "Copy as VHDL testbench"
    };
    static readonly HDL_ELEMENT_MIX_TESTBENCH_VUNIT = {
        id: "hdl_element_mix_testbench_vunit",
        description: "Copy as VHDL VUnit testbench"
    };

    // private to disallow creating other instances of this type
    private constructor(private readonly key: string, public readonly value: any) {
    }

    toString() {
        return this.key;
    }
}

/**
 * Get type of templates for HDL language
 * @param  {HDL_LANG} lang HDL language
 */
export function get_template_names(lang: HDL_LANG) {
    if (lang === HDL_LANG.VHDL) {
        return TEMPLATE_NAME_VHDL;
    }
    else {
        return TEMPLATE_NAME_VERILOG;
    }
}

/** Clock generation style */
export enum TYPE_CLOCK_GENERATION_STYLE {
    INLINE = "inline",
    IFELSE = "ifelse"
}

/** Component declaration style */
export enum TYPE_INSTANCE_DECLARATION {
    INLINE = "inline",
    SEPARATE = "separate"
}

/** Options to generate a template */
export type t_options = {
    header_file_path: string;
    indent_char: string;
    clock_generation_style: TYPE_CLOCK_GENERATION_STYLE,
    instance_style: TYPE_INSTANCE_DECLARATION
};