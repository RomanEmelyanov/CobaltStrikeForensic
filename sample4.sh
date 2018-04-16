#!/bin/sh

./L4_extract_settings.py input/int4.dll > L4/settings.py
./L4/main.py --in_file=input/beacon4.html --out_file=output/beacon4_enc.dll
objdump -p output/beacon4_enc.dll | grep ^Time > output/beacon4_enc.txt

# TODO: fix align four BUG in L2_beacon_ECB.py , workaroud below
#dd if=output/beacon4_enc.dll of=output/beacon4_enc2.dll skip=4109 bs=1 # too slow :(
tail -c +4110 output/beacon4_enc.dll > output/beacon4_enc2.dll

objdump -D -b binary -m intel -mi386 output/beacon4_enc2.dll | head -n 35 > output/beacon4_decoder.asm
./L2_beacon_CBC.py output/beacon4_enc2.dll output/beacon4.dll
./L3_byte_ECB.py output/beacon4.dll 0x69 output/beacon4.bin.cfg
strings output/beacon4.bin.cfg | grep -A 8 -B 1 Mozilla > output/beacon4.txt
objdump -p output/beacon4.dll | grep ^Time >> output/beacon4.txt
