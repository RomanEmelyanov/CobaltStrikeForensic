#!/usr/bin/python

import sys
import struct

key = int(sys.argv[2],16)
f = open(sys.argv[1], "rb")
buf = f.read()
c1 = (struct.unpack_from("<I", buf, 0)[0] ^ struct.unpack_from("<I", buf, 4)[0]) + key
c2 = struct.unpack_from("<I", buf, 0)[0]
decoded = []
for i in range(2, len(buf)/4):
	c = c1 ^ ((c2 ^ struct.unpack_from("<I", buf, i*4)[0]) + key)
	decoded.append(c&0xFFFFFFFF)
	c1 = c&0xFFFFFFFF
f.close()
f = open(sys.argv[3], "wb")
a = struct.pack("<"+"I"*len(decoded),*decoded)
f.write(a)
f.close()
