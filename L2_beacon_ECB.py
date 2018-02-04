#!/usr/bin/python

import sys
import struct

f = open(sys.argv[1], "rb")
buf = f.read()
f.close()

offset = buf.find('\xff\xff\xff') + 3
print "Offset = "+hex(offset)
key = struct.unpack_from("<I", buf, offset)[0]
print "Key = "+hex(key)
size = (struct.unpack_from("<I", buf, offset+4)[0]) ^ key
print "Size =",size,"bytes"

decoded = []
for i in range(2+offset/4, len(buf)/4):
	a = struct.unpack_from("<I", buf, i*4)[0] ^ key
	decoded.append(a)

f = open(sys.argv[2], "wb")
a = struct.pack("<"+"I"*len(decoded),*decoded)
f.write(a)
f.close()
