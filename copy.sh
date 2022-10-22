#!/bin/bash

npm install
rm -rf ../vscode-terosHDL/node_modules/teroshdl2/out/
cp -R out ../vscode-terosHDL/node_modules/teroshdl2/
