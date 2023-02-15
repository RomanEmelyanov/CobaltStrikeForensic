#!/usr/bin/env python3

# -*- coding: utf-8 -*-

# Tested on CS version 3.14 and 4.7

import requests, struct, sys, os, urllib3, base64

proxy = {} # {'http' : 'http://127.0.0.1:3128', 'https' : 'https://127.0.0.1:3128'}
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
headers = {"User-Agent":""}

def is_url(x):
    try:
        r = urlparse(x)
        return all([r.scheme, r.netloc])
    except:
        return False

def extract_config(arch):
	cfg = b''
	dll = arch + '.dll'
	f = open(dll, 'rb')
	buf = f.read()
	f.close()
	for i in range(len(buf)):
		if(buf[i]==0x4d and buf[i+1]==0x5a): # MZ header
			break
	if i > 0:
		print('Stage transform-' + arch + ' prepend detected', buf[:i])
		f = open(dll, 'wb')
		f.write(buf[i:])
		f.close()
		os.system('file '+dll)
	for i in range(len(buf)//4):
		chunk = struct.unpack_from('<I', buf, i*4)[0] ^ 0x2e2e2e2e # '.'x4 CSv4x
		cfg += struct.pack('<I', chunk)
	offset = cfg.find(b'\x00\x01\x00\x01\x00\x02')
	if offset < 0:
		cfg = b''
		for i in range(len(buf)//4):
			chunk = struct.unpack_from('<I', buf, i*4)[0] ^ 0x69696969 # 'i'x4 CSv3x
			cfg += struct.pack('<I', chunk)
		offset = cfg.find(b'\x00\x01\x00\x01\x00\x02')
	if offset > 0:
		print('Beacon configuration found at', hex(offset) )
		s_type = 1
		while s_type:
			s_type = struct.unpack_from('>H', cfg, offset)[0]
			s_h = struct.unpack_from('>H', cfg, offset + 2)[0]
			s_size = struct.unpack_from('>H', cfg, offset + 4)[0]
			offset += 6 # see v4.4 /beacon/BeaconConstants
			if s_type == 0x1 and s_size == 2: # short
				print('beacon type: ', struct.unpack_from('>h', cfg, offset)[0])
			if s_type == 0x25 and s_size == 4: # integer
				print('license-id: ', struct.unpack_from('>i', cfg, offset)[0])
			if s_type == 0x08 and s_size == 0x100: # string
				print('server,get-uri: ', struct.unpack_from('256s', cfg, offset)[0].decode())
			if s_type == 0x09 and s_size == 0x100: # string
				print('user-agent: ', struct.unpack_from('256s', cfg, offset)[0].decode())
			if s_type == 0x0a and s_size == 0x40: # string
				print('post-uri: ', struct.unpack_from('64s', cfg, offset)[0].decode())
			if s_type == 0x07 and s_size == 0x100: # string
				pubkey = struct.unpack_from('256s', cfg, offset)[0]
				# print('pubkey_hex: ', pubkey.hex())
				print('pubkey_b64: ', base64.b64encode(pubkey))
				with open(arch+'_pubkey.der', 'wb') as f:
					f.write(pubkey)
				f.close()
				# os.system('openssl rsa -in ' + arch + '_pubkey.der -pubin -inform DER -noout -text 2>&1 | grep -A 1 ^Modulus')
				os.system('openssl rsa -in ' + arch + '_pubkey.der -pubin -inform DER -out ' + arch + '_pubkey.pem')
				print('Pubkey saved to file ' + arch + '_pubkey.pem')
			offset += s_size
	else:
		print('Beacon configuration NOT found\n')
	
def get_beacon(cs_url, cs_path, arch):
	cs_url = cs_url + cs_path
	print("\nTrying to get " + arch + ' beacon via ', cs_url)
	try:
		resp = requests.get(cs_url, timeout=10, headers=headers, proxies=proxy, verify=False)
	except requests.exceptions.RequestException as e:
		print('Connection error: ', e)
		sys.exit()

	if(resp.status_code==200):
		print('Stage', arch, 'downloaded', len(resp.content), 'bytes')
		buf = resp.content
		offset = buf.find(b'EICAR-STANDARD-ANTIVIRUS-TEST-FILE')
		f = open(arch+'.dll', 'wb')
		if(offset>0):
			f.write(buf)
			size = len(buf)
			print('Trial beacon', arch, 'dll size', size, 'bytes saved to', arch + '.dll')
		else:
			offset = buf.find(b'\xff\xff\xff') + 3
			print('Beacon offset: ' + hex(offset))
			key = struct.unpack_from('<I', buf, offset)[0]
			size = (struct.unpack_from('<I', buf, offset+4)[0]) ^ key
			c = struct.unpack_from('<I', buf, offset+8)[0] ^ key
			mz = c & 0xffff
			if( not (mz==0x5a4d or mz==0x9090) ):
				print(' ### Decode goes wrong, possible custom configuration or cracked version: ' + hex(mz) + ' ###')
				f.write(buf)
				size = len(buf)
				print('Cracked beacon', arch, 'dll size', size, 'bytes saved to', arch + '.dll')
			else:
				print('Decryption key: ' + hex(key))
				f.write(struct.pack('<I', c))
				for i in range(2+offset//4, len(buf)//4-4):
					a = struct.unpack_from('<I', buf, i*4)[0]
					b = struct.unpack_from('<I', buf, i*4+4)[0]
					с = a ^ b
					f.write(struct.pack('<I', с))
				print('Beacon', arch, 'dll size', size, 'bytes saved to', arch + '.dll')
		f.close()
		extract_config(arch)
	else:
		print('Received HTTP code', resp.status_code, 'with content size', len(resp.content))

try:
	cs_url = sys.argv[1]
except:
	sys.exit('Usage: ' + sys.argv[0] + ' Cobalt Strike listener/payload URL, like http://127.0.0.1:80')

get_beacon(cs_url, '/ab2g', 'x86')
get_beacon(cs_url, '/ab2h', 'x64')
