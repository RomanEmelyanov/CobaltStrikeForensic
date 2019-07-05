#!/usr/bin/python3

# -*- coding: utf-8 -*-

"""
Script for check password on Cobalt Strike Team Server
"""
import socket, ssl, struct, sys

try:
	cs_host = sys.argv[1]
	cs_port = int(sys.argv[2]) # default 50050
	cs_pass = sys.argv[3]
except:
	sys.exit('Usage example: ./script.py host port password')

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
ss = ssl.wrap_socket(s, ssl_version=ssl.PROTOCOL_TLSv1_2)
addr = (cs_host, cs_port)
ss.connect(addr)
cs_pass_len = struct.pack('b', len(cs_pass))
req = b'\x00\x00\xbe\xef' + cs_pass_len + cs_pass.encode('utf8') + b'A' * 255
ss.send(req)
r1 = ss.recv(1)
r2 = ss.recv(1)
r3 = ss.recv(1)
ss.close()
verdict = 'Cobalt Strike Team Server password '
verdict += 'FOUND' if(r3 == b'\xca') else 'WRONG'
verdict += ': ' + cs_pass
print(verdict)