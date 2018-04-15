#!/bin/sh

./L4_extract_settings.py input/int3.dll > L4/settings.py
./L4/main.py --in_file=input/procdump3.html --out_file=output/procdump3.dll
./L4/main.py --in_file=input/screenshot3.html --out_file=output/screenshot3.dll
objdump -p output/procdump3.dll | grep ^Time > output/procdump3.txt
objdump -p output/screenshot3.dll | grep ^Time > output/screenshot3.txt
