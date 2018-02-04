#!/usr/bin/python

import sys
import struct
f = open(sys.argv[1], "rb")
buf = f.read()
f.close()

m1 = 0x605825eb
m2 = 0x3304488b
k = 0
a = struct.unpack_from("<I", buf, 0)[0] # key1
b = struct.unpack_from("<I", buf, 4)[0] # key2
x = struct.unpack_from("<I", buf, 8)[0]
y = struct.unpack_from("<I", buf, 12)[0]
ab = a ^ b
ax = a ^ x
ay = a ^ y

for z in xrange(0, 0xFFFFFFFF):
	o = (ab+z)^(ax+z)&0xFFFFFFFF
        if o == m1:
                o = (o^(ay+z))&0xFFFFFFFF
                if o == m2:
			k = z
			break
print("key= +"+hex(k))

for z in xrange(0, 0xFFFFFFFF):
        o = (ab-z)^(ax-z)&0xFFFFFFFF
        if o == m1:
                o = (o^(ay-z))&0xFFFFFFFF
                if o == m2:
                        k = z
                        break
print("key= -"+hex(k))

