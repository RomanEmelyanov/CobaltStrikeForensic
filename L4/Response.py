#!/usr/bin/python3

# decrypt response from infected host to C2 server via HTTP POST requests
# first arg POST req & second arg decrypted file

from settings import * # get payload_decryption_key
import sys
import struct
import base64

f = open(sys.argv[1], "rb")
s = f.read()
post = base64.b64decode(s)
f.close()

# print("DEBUG: len_base64: ", len(s), " len_bytes: ", len(post))

key_len = len(payload_decryption_key)
dec = b''
for i in range(len(post)):
	a = struct.unpack_from("B", post, i)[0]
	b = payload_decryption_key[ i % key_len ]
	c = a ^ b
	cp = struct.pack("B", c)
	dec += cp

f = open(sys.argv[2], "wb")
f.write(dec[9:])
f.close()
