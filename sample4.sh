#!/bin/sh

./L4_extract_settings.py input/int4.dll > L4/settings.py
./L4/main.py --in_file=input/beacon4.html --out_file=output/beacon4_enc.dll
objdump -p output/beacon4_enc.dll | grep ^Time > output/beacon4_enc.txt
