#!/usr/bin/python

import sys
import struct

def dump_hex(offset1, offset2):
 for i in xrange(offset1, offset2):
  b = struct.unpack_from("B", a, i)[0]
  sys.stdout.write(hex(b))
  if i == offset2-1:
   print "]" 
  else:
   sys.stdout.write(", ")

f = open(sys.argv[1], "rb")
a = f.read()
f.close()

sys.stdout.write("#!/usr/bin/python\n\npayload_key = [")
dump_hex(0x02640, 0x0264b)
sys.stdout.write("\npayload_decryption_key = [")
dump_hex(0x02668, 0x026a8)
