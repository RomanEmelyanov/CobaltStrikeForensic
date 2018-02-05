#!/usr/bin/python

'''
USAGE: 
# ./L1_decrypt_custom.py encrypted_file.bin decrypted_file.dll

DESCRIPTION:
This script implements known plain-text attack againts some kind of CobaltStrike custom encryption. Sometimes it works, but sometimes - doesn't. 

Used attack is based on the assumption that final 8 bytes of plain-text binary equal 0x0000000000000000. This attack is very quick and doesn't depend on your CPU or other hardware, so, it is a good idea to launch it before bruteforce.

EXPLANATION:
Let's enum all 'chunks' (4-byte pieces of data in encrypted binary) of the encrypted binary as i_0, ..., i_(last+2). First two chunks i_0 and i_1 are service chunks and store data that should be used during decryption process.  

In this case, each next decrypted chunk value depends on previous decrypted chunk value and some data. Here is a small explanation:
    d_k = d_(k-1) ^ H_(k+2), 
where d_k is a decrypted value for encrypted chunk i_(k+2) and H_k = (i_0 ^ i_k) + offset.

'Offset' value is unknown for us and plays a role of encryption key.
If we assume that d_last and d_(last-1) are both equal 0x00000000, we can solve the equation and find this value. In other words:
    Offset = 0x100000000 - (i_0 ^ i_(last+2))
'''

import sys
import struct

# Actually, ChunkSize = sizeof(DWORD), but this value doesn't depend on CPU architecture.
ChunkSize = 4

# Chunk is a some piece of data with length equals to ChunkSize global var.
# Every chunk in encrypted file has its own index. 
def get_chunk(index, binary_buffer):
    return struct.unpack_from("<I", binary_buffer, index * ChunkSize)[0]

# Implements known-plaintext attack
def get_offset(binary_buffer):
    first_chunk = get_chunk(0, binary_buffer)
    last_chunk = get_chunk(len(binary_buffer) / ChunkSize - 1, binary_buffer)
    
    print "[+] First Encrypted Chunk:\t" + hex(first_chunk)
    print "[+] Last Encrypted Chunk:\t" + hex(last_chunk)
    offset = 0x100000000 - (first_chunk ^ last_chunk)

    print "[+] Calculated Offset Value:\t" + hex(offset)
    return offset

buf = ""
with open(sys.argv[1], "rb") as enc_file:
    print "[+] Reading Encrypted Binary: \t{}".format(sys.argv[1])
    buf = enc_file.read()

offset = get_offset(buf)

xor_line = get_chunk(0, buf)
c1 = ((xor_line ^ get_chunk(1, buf)) + offset) 

print "[*] Decoding..."
decoded = []
for i in range(2, len(buf) / ChunkSize):
    c = c1 ^ ((xor_line ^ get_chunk(i, buf)) + offset)
    c = c & 0xFFFFFFFF

    decoded.append(c)
    c1 = c
print "[+] Finished!"

with open(sys.argv[2], "wb") as dec_file:
    print "[+] Writing Decrypted Binary:\t{}".format(sys.argv[2])
    a = struct.pack("<"+"I" * len(decoded), *decoded)
    dec_file.write(a)
