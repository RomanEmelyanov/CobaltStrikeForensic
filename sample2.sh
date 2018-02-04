#!/bin/sh

# ./L0_brute_custom_key.py input/beacon2.bin # key is "-0x4C90D7D6"
./L1_custom.py input/beacon2.bin -0x4C90D7D6 output/beacon2.bin
objdump -D -m intel -b binary -mi386 output/beacon2.bin | head -n 30 > output/beacon2_decoder.asm 
./L2_beacon_CBC.py output/beacon2.bin output/beacon2.dll
./L3_byte_ECB.py output/beacon2.dll 0x69 output/beacon2.bin.cfg
strings output/beacon2.bin.cfg | grep -A 8 -B 1 Mozilla > output/beacon2.txt
objdump -p output/beacon2.dll | grep ^Time >> output/beacon2.txt
