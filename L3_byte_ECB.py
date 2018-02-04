#!/usr/bin/python

import sys

b = bytearray(open(sys.argv[1], 'rb').read())
for i in range(len(b)):
    b[i] ^= int(sys.argv[2],16)
open(sys.argv[3], 'wb').write(b)
