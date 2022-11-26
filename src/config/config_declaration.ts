/* eslint-disable max-len */
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

export type e_config = {
    "general" : {
        "general" : e_general_general,
    }
    "documentation" : {
        "general" : e_documentation_general,
    }
    "editor" : {
        "general" : e_editor_general,
    }
    "formatter" : {
        "general" : e_formatter_general,
        "istyle" : e_formatter_istyle,
        "s3sv" : e_formatter_s3sv,
        "verible" : e_formatter_verible,
        "standalone" : e_formatter_standalone,
        "svg" : e_formatter_svg,
    }
    "linter" : {
        "general" : e_linter_general,
        "ghdl" : e_linter_ghdl,
        "icarus" : e_linter_icarus,
        "modelsim" : e_linter_modelsim,
        "verible" : e_linter_verible,
        "verilator" : e_linter_verilator,
        "vivado" : e_linter_vivado,
        "vsg" : e_linter_vsg,
    }
    "schematic" : {
        "general" : e_schematic_general,
    }
    "templates" : {
        "general" : e_templates_general,
    }
    "tools" : {
        "general" : e_tools_general,
        "ascenlint" : e_tools_ascenlint,
        "cocotb" : e_tools_cocotb,
        "diamond" : e_tools_diamond,
        "ghdl" : e_tools_ghdl,
        "icarus" : e_tools_icarus,
        "icestorm" : e_tools_icestorm,
        "ise" : e_tools_ise,
        "isem" : e_tools_isem,
        "modelsim" : e_tools_modelsim,
        "morty" : e_tools_morty,
        "quartus" : e_tools_quartus,
        "radiant" : e_tools_radiant,
        "rivierapro" : e_tools_rivierapro,
        "siliconcompiler" : e_tools_siliconcompiler,
        "spyglass" : e_tools_spyglass,
        "symbiyosys" : e_tools_symbiyosys,
        "symbiflow" : e_tools_symbiflow,
        "trellis" : e_tools_trellis,
        "vcs" : e_tools_vcs,
        "veriblelint" : e_tools_veriblelint,
        "verilator" : e_tools_verilator,
        "vivado" : e_tools_vivado,
        "vunit" : e_tools_vunit,
        "xcelium" : e_tools_xcelium,
        "xsim" : e_tools_xsim,
        "yosys" : e_tools_yosys,
    }
};
export type e_general_general = {
    logging : boolean,
    pypath : string,
    go_to_definition_vhdl : boolean,
    go_to_definition_verilog : boolean,
    developer_mode : boolean,
};
    
export type e_documentation_general = {
    language : e_documentation_general_language,
    symbol_vhdl : string,
    symbol_verilog : string,
    dependency_graph : boolean,
    self_contained : boolean,
    fsm : boolean,
    ports : e_documentation_general_ports,
    generics : e_documentation_general_generics,
    instantiations : e_documentation_general_instantiations,
    signals : e_documentation_general_signals,
    constants : e_documentation_general_constants,
    types : e_documentation_general_types,
    process : e_documentation_general_process,
    functions : e_documentation_general_functions,
    magic_config_path : string,
};
    
export type e_editor_general = {
    continue_comment : boolean,
};
    
export type e_formatter_general = {
    formatter_verilog : e_formatter_general_formatter_verilog,
    formatter_vhdl : e_formatter_general_formatter_vhdl,
};
    
export type e_formatter_istyle = {
    style : e_formatter_istyle_style,
    indentation_size : number,
};
    
export type e_formatter_s3sv = {
    one_bind_per_line : boolean,
    one_declaration_per_line : boolean,
    use_tabs : boolean,
    indentation_size : number,
};
    
export type e_formatter_verible = {
    path : string,
    format_args : [],
};
    
export type e_formatter_standalone = {
    keyword_case : e_formatter_standalone_keyword_case,
    name_case : e_formatter_standalone_name_case,
    align_comments : boolean,
    indentation : string,
    align_generic_port : boolean,
};
    
export type e_formatter_svg = {
    configuration : string,
};
    
export type e_linter_general = {
    linter_vhdl : e_linter_general_linter_vhdl,
    linter_verilog : e_linter_general_linter_verilog,
    lstyle_verilog : e_linter_general_lstyle_verilog,
    lstyle_vhdl : e_linter_general_lstyle_vhdl,
};
    
export type e_linter_ghdl = {
    arguments : string,
};
    
export type e_linter_icarus = {
    arguments : string,
};
    
export type e_linter_modelsim = {
    vhdl_arguments : string,
    verilog_arguments : string,
};
    
export type e_linter_verible = {
    arguments : string,
};
    
export type e_linter_verilator = {
    arguments : string,
};
    
export type e_linter_vivado = {
    vhdl_arguments : string,
    verilog_arguments : string,
};
    
export type e_linter_vsg = {
    arguments : string,
};
    
export type e_schematic_general = {
    backend : e_schematic_general_backend,
};
    
export type e_templates_general = {
    header_file_path : string,
    indent : string,
    clock_generation_style : e_templates_general_clock_generation_style,
    instance_style : e_templates_general_instance_style,
};
    
export type e_tools_general = {
    select_tool : e_tools_general_select_tool,
    execution_mode : e_tools_general_execution_mode,
    waveform_viewer : e_tools_general_waveform_viewer,
};
    
export type e_tools_ascenlint = {
    installation_path : string,
    ascentlint_options : [],
};
    
export type e_tools_cocotb = {
    installation_path : string,
    simulator_name : e_tools_cocotb_simulator_name,
    compile_args : string,
    run_args : string,
    plusargs : string,
};
    
export type e_tools_diamond = {
    installation_path : string,
    part : string,
};
    
export type e_tools_ghdl = {
    installation_path : string,
    waveform : e_tools_ghdl_waveform,
    analyze_options : [],
    run_options : [],
};
    
export type e_tools_icarus = {
    installation_path : string,
    timescale : string,
    iverilog_options : [],
};
    
export type e_tools_icestorm = {
    installation_path : string,
    pnr : e_tools_icestorm_pnr,
    arch : e_tools_icestorm_arch,
    output_format : e_tools_icestorm_output_format,
    yosys_as_subtool : boolean,
    makefile_name : string,
    arachne_pnr_options : [],
    nextpnr_options : [],
    yosys_synth_options : [],
};
    
export type e_tools_ise = {
    installation_path : string,
    family : string,
    device : string,
    package : string,
    speed : string,
};
    
export type e_tools_isem = {
    installation_path : string,
    fuse_options : [],
    isim_options : [],
};
    
export type e_tools_modelsim = {
    installation_path : string,
    vcom_options : [],
    vlog_options : [],
    vsim_options : [],
};
    
export type e_tools_morty = {
    installation_path : string,
    morty_options : [],
};
    
export type e_tools_quartus = {
    installation_path : string,
    family : string,
    device : string,
    cable : string,
    board_device_index : string,
    pnr : e_tools_quartus_pnr,
    dse_options : [],
    quartus_options : [],
};
    
export type e_tools_radiant = {
    installation_path : string,
    part : string,
};
    
export type e_tools_rivierapro = {
    installation_path : string,
    compilation_mode : string,
    vlog_options : [],
    vsim_options : [],
};
    
export type e_tools_siliconcompiler = {
    installation_path : string,
    target : string,
    server_enable : boolean,
    server_address : string,
    server_username : string,
    server_password : string,
};
    
export type e_tools_spyglass = {
    installation_path : string,
    methodology : string,
    goals : [],
    spyglass_options : [],
    rule_parameters : [],
};
    
export type e_tools_symbiyosys = {
    installation_path : string,
    tasknames : [],
};
    
export type e_tools_symbiflow = {
    installation_path : string,
    package : string,
    part : string,
    vendor : string,
    pnr : e_tools_symbiflow_pnr,
    vpr_options : string,
    environment_script : string,
};
    
export type e_tools_trellis = {
    installation_path : string,
    arch : e_tools_trellis_arch,
    output_format : e_tools_trellis_output_format,
    yosys_as_subtool : boolean,
    makefile_name : string,
    script_name : string,
    nextpnr_options : [],
    yosys_synth_options : [],
};
    
export type e_tools_vcs = {
    installation_path : string,
    vcs_options : [],
    run_options : [],
};
    
export type e_tools_veriblelint = {
    installation_path : string,
    ruleset : e_tools_veriblelint_ruleset,
    verible_lint_args : [],
    rules : [],
};
    
export type e_tools_verilator = {
    installation_path : string,
    mode : e_tools_verilator_mode,
    libs : [],
    verilator_options : [],
    make_options : [],
    run_options : [],
};
    
export type e_tools_vivado = {
    installation_path : string,
    part : string,
    synth : string,
    pnr : e_tools_vivado_pnr,
    jtag_freq : number,
    hw_target : string,
};
    
export type e_tools_vunit = {
    installation_path : string,
    simulator_name : e_tools_vunit_simulator_name,
    runpy_mode : e_tools_vunit_runpy_mode,
    extra_options : [],
    enable_array_util_lib : boolean,
    enable_com_lib : boolean,
    enable_json4vhdl_lib : boolean,
    enable_osvvm_lib : boolean,
    enable_random_lib : boolean,
    enable_verification_components_lib : boolean,
};
    
export type e_tools_xcelium = {
    installation_path : string,
    xmvhdl_options : [],
    xmvlog_options : [],
    xmsim_options : [],
    xrun_options : [],
};
    
export type e_tools_xsim = {
    installation_path : string,
    xelab_options : [],
    xsim_options : [],
};
    
export type e_tools_yosys = {
    installation_path : string,
    arch : e_tools_yosys_arch,
    output_format : e_tools_yosys_output_format,
    yosys_as_subtool : boolean,
    makefile_name : string,
    script_name : string,
    yosys_synth_options : [],
};
    
export enum e_documentation_general_language {
    english = "english",
    russian = "russian",
}
export enum e_documentation_general_ports {
    all = "all",
    only_commented = "only_commented",
    none = "none",
}
export enum e_documentation_general_generics {
    all = "all",
    only_commented = "only_commented",
    none = "none",
}
export enum e_documentation_general_instantiations {
    all = "all",
    only_commented = "only_commented",
    none = "none",
}
export enum e_documentation_general_signals {
    all = "all",
    only_commented = "only_commented",
    none = "none",
}
export enum e_documentation_general_constants {
    all = "all",
    only_commented = "only_commented",
    none = "none",
}
export enum e_documentation_general_types {
    all = "all",
    only_commented = "only_commented",
    none = "none",
}
export enum e_documentation_general_process {
    all = "all",
    only_commented = "only_commented",
    none = "none",
}
export enum e_documentation_general_functions {
    all = "all",
    only_commented = "only_commented",
    none = "none",
}
export enum e_formatter_general_formatter_verilog {
    istyle = "istyle",
    s3sv = "s3sv",
    verible = "verible",
}
export enum e_formatter_general_formatter_vhdl {
    standalone = "standalone",
    vsg = "vsg",
}
export enum e_formatter_istyle_style {
    ansi = "ansi",
    kernighan_ritchie = "kernighan&ritchie",
    gnu = "gnu",
    indent_only = "indent_only",
}
export enum e_formatter_standalone_keyword_case {
    lowercase = "lowercase",
    uppercase = "uppercase",
}
export enum e_formatter_standalone_name_case {
    lowercase = "lowercase",
    uppercase = "uppercase",
}
export enum e_linter_general_linter_vhdl {
    disabled = "disabled",
    ghdl = "ghdl",
    modelsim = "modelsim",
    vivado = "vivado",
    none = "none",
}
export enum e_linter_general_linter_verilog {
    disabled = "disabled",
    icarus = "icarus",
    modelsim = "modelsim",
    verilator = "verilator",
    vivado = "vivado",
}
export enum e_linter_general_lstyle_verilog {
    verible = "verible",
    disabled = "disabled",
}
export enum e_linter_general_lstyle_vhdl {
    vsg = "vsg",
    disabled = "disabled",
}
export enum e_schematic_general_backend {
    yowasp = "yowasp",
    yosys = "yosys",
    yosys_ghdl = "yosys_ghdl",
    yosys_ghdl_module = "yosys_ghdl_module",
}
export enum e_templates_general_clock_generation_style {
    inline = "inline",
    ifelse = "ifelse",
}
export enum e_templates_general_instance_style {
    inline = "inline",
    separate = "separate",
}
export enum e_tools_general_select_tool {
    vunit = "vunit",
    ghdl = "ghdl",
    cocotb = "cocotb",
}
export enum e_tools_general_execution_mode {
    gui = "gui",
    cmd = "cmd",
}
export enum e_tools_general_waveform_viewer {
    tool = "tool",
    vcdrom = "vcdrom",
    gtkwave = "gtkwave",
}
export enum e_tools_cocotb_simulator_name {
    icarus = "icarus",
    verilator = "verilator",
    vcs = "vcs",
    riviera = "riviera",
    activehdl = "activehdl",
    questa = "questa",
    modelsim = "modelsim",
    ius = "ius",
    xcelium = "xcelium",
    ghdl = "ghdl",
    cvc = "cvc",
}
export enum e_tools_ghdl_waveform {
    vcd = "vcd",
    ghw = "ghw",
}
export enum e_tools_icestorm_pnr {
    arachne = "arachne",
    next = "next",
    none = "none",
}
export enum e_tools_icestorm_arch {
    xilinx = "xilinx",
    ice40 = "ice40",
    ecp5 = "ecp5",
}
export enum e_tools_icestorm_output_format {
    json = "json",
    edif = "edif",
    blif = "blif",
}
export enum e_tools_quartus_pnr {
    default = "default",
    dse = "dse",
    none = "none",
}
export enum e_tools_symbiflow_pnr {
    vpr = "vpr",
}
export enum e_tools_trellis_arch {
    xilinx = "xilinx",
    ice40 = "ice40",
    ecp5 = "ecp5",
}
export enum e_tools_trellis_output_format {
    json = "json",
    edif = "edif",
    blif = "blif",
}
export enum e_tools_veriblelint_ruleset {
    default = "default",
    all = "all",
    none = "none",
}
export enum e_tools_verilator_mode {
    cc = "cc",
    sc = "sc",
    lint_only = "lint-only",
}
export enum e_tools_vivado_pnr {
    vivado = "vivado",
    none = "none",
}
export enum e_tools_vunit_simulator_name {
    rivierapro = "rivierapro",
    activehdl = "activehdl",
    ghdl = "ghdl",
    modelsim = "modelsim",
    xsim = "xsim",
}
export enum e_tools_vunit_runpy_mode {
    standalone = "standalone",
    creation = "creation",
}
export enum e_tools_yosys_arch {
    xilinx = "xilinx",
    ice40 = "ice40",
    ecp5 = "ecp5",
}
export enum e_tools_yosys_output_format {
    json = "json",
    edif = "edif",
    blif = "blif",
}

export function get_default_config(): e_config {
    return {
        general: {
            general: {
                logging : true,
                pypath : "",
                go_to_definition_vhdl : true,
                go_to_definition_verilog : true,
                developer_mode : false,
            },
        },
        documentation: {
            general: {
                language : e_documentation_general_language.english,
                symbol_vhdl : "",
                symbol_verilog : "",
                dependency_graph : true,
                self_contained : true,
                fsm : true,
                ports : e_documentation_general_ports.all,
                generics : e_documentation_general_generics.all,
                instantiations : e_documentation_general_instantiations.all,
                signals : e_documentation_general_signals.all,
                constants : e_documentation_general_constants.all,
                types : e_documentation_general_types.all,
                process : e_documentation_general_process.all,
                functions : e_documentation_general_functions.all,
                magic_config_path : "",
            },
        },
        editor: {
            general: {
                continue_comment : false,
            },
        },
        formatter: {
            general: {
                formatter_verilog : e_formatter_general_formatter_verilog.istyle,
                formatter_vhdl : e_formatter_general_formatter_vhdl.standalone,
            },
            istyle: {
                style : e_formatter_istyle_style.ansi,
                indentation_size : 2,
            },
            s3sv: {
                one_bind_per_line : false,
                one_declaration_per_line : false,
                use_tabs : false,
                indentation_size : 2,
            },
            verible: {
                path : "",
                format_args : [],
            },
            standalone: {
                keyword_case : e_formatter_standalone_keyword_case.lowercase,
                name_case : e_formatter_standalone_name_case.lowercase,
                align_comments : false,
                indentation : "  ",
                align_generic_port : false,
            },
            svg: {
                configuration : "",
            },
        },
        linter: {
            general: {
                linter_vhdl : e_linter_general_linter_vhdl.ghdl,
                linter_verilog : e_linter_general_linter_verilog.modelsim,
                lstyle_verilog : e_linter_general_lstyle_verilog.disabled,
                lstyle_vhdl : e_linter_general_lstyle_vhdl.disabled,
            },
            ghdl: {
                arguments : "",
            },
            icarus: {
                arguments : "",
            },
            modelsim: {
                vhdl_arguments : "",
                verilog_arguments : "",
            },
            verible: {
                arguments : "",
            },
            verilator: {
                arguments : "",
            },
            vivado: {
                vhdl_arguments : "",
                verilog_arguments : "",
            },
            vsg: {
                arguments : "",
            },
        },
        schematic: {
            general: {
                backend : e_schematic_general_backend.yowasp,
            },
        },
        templates: {
            general: {
                header_file_path : "",
                indent : "  ",
                clock_generation_style : e_templates_general_clock_generation_style.inline,
                instance_style : e_templates_general_instance_style.inline,
            },
        },
        tools: {
            general: {
                select_tool : e_tools_general_select_tool.ghdl,
                execution_mode : e_tools_general_execution_mode.cmd,
                waveform_viewer : e_tools_general_waveform_viewer.tool,
            },
            ascenlint: {
                installation_path : "",
                ascentlint_options : [],
            },
            cocotb: {
                installation_path : "",
                simulator_name : e_tools_cocotb_simulator_name.ghdl,
                compile_args : "",
                run_args : "",
                plusargs : "",
            },
            diamond: {
                installation_path : "",
                part : "",
            },
            ghdl: {
                installation_path : "",
                waveform : e_tools_ghdl_waveform.vcd,
                analyze_options : [],
                run_options : [],
            },
            icarus: {
                installation_path : "",
                timescale : "",
                iverilog_options : [],
            },
            icestorm: {
                installation_path : "",
                pnr : e_tools_icestorm_pnr.none,
                arch : e_tools_icestorm_arch.xilinx,
                output_format : e_tools_icestorm_output_format.json,
                yosys_as_subtool : false,
                makefile_name : "",
                arachne_pnr_options : [],
                nextpnr_options : [],
                yosys_synth_options : [],
            },
            ise: {
                installation_path : "",
                family : "",
                device : "",
                package : "",
                speed : "",
            },
            isem: {
                installation_path : "",
                fuse_options : [],
                isim_options : [],
            },
            modelsim: {
                installation_path : "",
                vcom_options : [],
                vlog_options : [],
                vsim_options : [],
            },
            morty: {
                installation_path : "",
                morty_options : [],
            },
            quartus: {
                installation_path : "",
                family : "",
                device : "",
                cable : "",
                board_device_index : "",
                pnr : e_tools_quartus_pnr.none,
                dse_options : [],
                quartus_options : [],
            },
            radiant: {
                installation_path : "",
                part : "",
            },
            rivierapro: {
                installation_path : "",
                compilation_mode : "",
                vlog_options : [],
                vsim_options : [],
            },
            siliconcompiler: {
                installation_path : "",
                target : "",
                server_enable : false,
                server_address : "",
                server_username : "",
                server_password : "",
            },
            spyglass: {
                installation_path : "",
                methodology : "",
                goals : [],
                spyglass_options : [],
                rule_parameters : [],
            },
            symbiyosys: {
                installation_path : "",
                tasknames : [],
            },
            symbiflow: {
                installation_path : "",
                package : "",
                part : "",
                vendor : "",
                pnr : e_tools_symbiflow_pnr.vpr,
                vpr_options : "",
                environment_script : "",
            },
            trellis: {
                installation_path : "",
                arch : e_tools_trellis_arch.xilinx,
                output_format : e_tools_trellis_output_format.json,
                yosys_as_subtool : false,
                makefile_name : "",
                script_name : "",
                nextpnr_options : [],
                yosys_synth_options : [],
            },
            vcs: {
                installation_path : "",
                vcs_options : [],
                run_options : [],
            },
            veriblelint: {
                installation_path : "",
                ruleset : e_tools_veriblelint_ruleset.default,
                verible_lint_args : [],
                rules : [],
            },
            verilator: {
                installation_path : "",
                mode : e_tools_verilator_mode.lint_only,
                libs : [],
                verilator_options : [],
                make_options : [],
                run_options : [],
            },
            vivado: {
                installation_path : "",
                part : "",
                synth : "",
                pnr : e_tools_vivado_pnr.vivado,
                jtag_freq : 10000,
                hw_target : "",
            },
            vunit: {
                installation_path : "",
                simulator_name : e_tools_vunit_simulator_name.ghdl,
                runpy_mode : e_tools_vunit_runpy_mode.standalone,
                extra_options : [],
                enable_array_util_lib : false,
                enable_com_lib : false,
                enable_json4vhdl_lib : false,
                enable_osvvm_lib : false,
                enable_random_lib : false,
                enable_verification_components_lib : false,
            },
            xcelium: {
                installation_path : "",
                xmvhdl_options : [],
                xmvlog_options : [],
                xmsim_options : [],
                xrun_options : [],
            },
            xsim: {
                installation_path : "",
                xelab_options : [],
                xsim_options : [],
            },
            yosys: {
                installation_path : "",
                arch : e_tools_yosys_arch.xilinx,
                output_format : e_tools_yosys_output_format.json,
                yosys_as_subtool : false,
                makefile_name : "",
                script_name : "",
                yosys_synth_options : [],
            },
        },
    };
}