#!/bin/sh

objdump -D -b binary -mi386 input/beacon1.bin | head -n 30 > output/beacon1_decoder.asm
./L2_beacon_ECB.py input/beacon1.bin output/beacon1.dll
./L3_byte_ECB.py output/beacon1.dll 0x69 output/beacon1.bin.cfg
strings output/beacon1.bin.cfg | grep -A 7 -B 1 Mozilla > output/beacon1.txt
objdump -p output/beacon1.dll | grep ^Time >> output/beacon1.txt
