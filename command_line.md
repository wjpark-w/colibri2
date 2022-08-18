# Command line

## Installation

- From the code:

```
npm install
npm run compile
```

- With the installers: https://github.com/TerosTechnology/colibri2/releases

## Formatter

- Arguments:

```
carlos@carlos-pc:~/repo/colibri2 ./bin/run teroshdl:formatter --help
Check errors in HDL files.

USAGE
  $ teroshdl teroshdl:formatter -i <value> --formatter standalone_vhdl|istyle|s3sv|verible [--mode only-check|format] [--python-path <value>] [--formatter-arguments <value>] [-s] [-v]

FLAGS
  -i, --input=<value>            (required) Path CSV with a list of files or glob pattern. E.g: --input "/mypath/*.vhd"
  -s, --silent                   Silent mode
  -v, --verbose                  Verbose mode
  --formatter=<option>           (required) [default: standalone_vhdl] Formatter name
                                 <options: standalone_vhdl|istyle|s3sv|verible>
  --formatter-arguments=<value>  Arguments passed to the formatter.
  --mode=<option>                [default: only-check] Opeation mode. Format and save the formatted code or only check
                                 <options: only-check|format>
  --python-path=<value>          Python path. Empty to use the system path.

DESCRIPTION
  Check errors in HDL files.
```

- Example:

```
./bin/run teroshdl:formatter --input ./tests/command/template/helpers/sample_0.vhd --mode only-check
```

## Linter

You can see an example of the linter report here [here](https://terostechnology.github.io/colibri2/example_report_linter.html)

```
carlos@carlos-pc:~/repo/colibri2 ./bin/run teroshdl:linter --help
Check errors in HDL files.

USAGE
  $ teroshdl teroshdl:linter -i <value> --linter ghdl|icarus|modelsim|svling|verilbe|verilator|vsg|xvhdl|xvlog [-o <value>] [--linter-path <value>] [--linter-arguments <value>] [-s] [-v]

FLAGS
  -i, --input=<value>         (required) Path CSV with a list of files or glob pattern. E.g: --input "/mypath/*.vhd"
  -o, --output=<value>        Output report path. E.g: report.html
  -s, --silent                Silent mode
  -v, --verbose               Verbose mode
  --linter=<option>           (required) [default: ghdl] Linter name
                              <options: ghdl|icarus|modelsim|svling|verilbe|verilator|vsg|xvhdl|xvlog>
  --linter-arguments=<value>  Arguments passed to the linter.
  --linter-path=<value>       Directory to the location where tool binary is located. Empty to use the system path.

DESCRIPTION
  Check errors in HDL files.

```

- Example:

```
./bin/run teroshdl:linter --input "./tests/command/linter/helpers/*.vhd" --output report.html
```

## Templates

```
carlos@carlos-pc:~/repo/colibri ./bin/run teroshdl:template --help
Generate HDL template from a file.

USAGE
  $ teroshdl teroshdl:template [-i <value>] [-o <value>] [-m
    cocotb|testbench|vunit_testbench|instance|signal|mix_instance|mix_testbench|mix_vunit_testbench|testbench|vunit_testbench|component|instance|signal|mix_instance|mix_testbench|mix_vunit_t
    estbench] [--indent <value>] [--header <value>] [--clock ifelse|inline] [--instance oneline|separate] [-s]

FLAGS
  -i, --input=<value>   HDL (VHDL, Verilog or SV) input file
  -m, --mode=<option>   [default: instance] Template mode
                        <options: cocotb|testbench|vunit_testbench|instance|signal|mix_instance|mix_testbench|mix_vunit_testbench|testbench|vunit_testbench|component|instance|signal|mix_inst
                        ance|mix_testbench|mix_vunit_testbench>
  -o, --output=<value>  [default: template] Output file path. E.g: template.sv
  -s, --show_modes      Show modes description
  --clock=<option>      [default: inline] Clock generation style. With if/else or in one line
                        <options: ifelse|inline>
  --header=<value>      File path with the template header (as company license). It will be inserted at be beginning
  --indent=<value>      [default:   ] Indent
  --instance=<option>   [default: oneline] Instance style for VHDL. Only with entity or with entity + component
                        <options: oneline|separate>

DESCRIPTION
  Generate HDL template from a fil
```

- Example:

```
./bin/run teroshdl:template --input ./tests/command/template/helpers/sample_0.vhd --mode testbench --output template.vhd
```