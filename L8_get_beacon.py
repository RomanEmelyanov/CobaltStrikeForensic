#!/usr/bin/python3

# -*- coding: utf-8 -*-

import requests, struct, sys, os, urllib3

proxy = {} # {'http' : 'http://127.0.0.1:3128', 'https' : 'https://127.0.0.1:3128'}
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
headers = {"User-Agent":""}
endian = '<I'

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
	if(i>0):
		print('Stage transform-' + arch + ' prepend detected', buf[:i])
		f = open(dll, 'wb')
		f.write(buf[i:])
		f.close()
		os.system('file '+dll)
	for i in range(len(buf)//4):
		chunk = struct.unpack_from(endian, buf, i*4)[0] ^ 0x69696969
		cfg += struct.pack(endian, chunk)
	offset = cfg.find(b'Mozilla/')
	if(offset>0):
		print('UA beacon configuration found at', hex(offset) )
		ua = struct.unpack_from('128s', cfg, offset)[0].decode()
		print('User-Agent:', ua)
		offset = offset - 512 - 12 # see BeaconSetup for offset details
		print('Pubkey beacon configuration suppose at', hex(offset) )
		pubkey = struct.unpack_from('256s', cfg, offset)[0]
		with open(arch+'_pubkey.der', 'wb') as f:
			f.write(pubkey)
		f.close()
		os.system('openssl rsa -in ' + arch + '_pubkey.der -pubin -inform DER -noout -text 2>&1 | grep -A 1 ^Modulus')
		os.system('openssl rsa -in ' + arch + '_pubkey.der -pubin -inform DER -out ' + arch + '_pubkey.pem')
		print('Pubkey saved to file ' + arch + '_pubkey.pem\n')
	else:
		print('Beacon configuration NOT found\n')

def get_beacon(cs_url, cs_path, arch):
	cs_url = cs_url + cs_path
	print('Trying to get ' + arch + ' beacon by', cs_url)
	try:
		resp = requests.get(cs_url, timeout=10, headers=headers, proxies = proxy, verify=False)
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
			key = struct.unpack_from(endian, buf, offset)[0]
			size = (struct.unpack_from(endian, buf, offset+4)[0]) ^ key
			c = struct.unpack_from(endian, buf, offset+8)[0] ^ key
			mz = c & 0xffff
			if( not (mz==0x5a4d or mz==0x9090) ):
				print(' ### Decode goes wrong, possible custom configuration or cracked version: ' + hex(mz) + ' ###')
				f.write(buf)
				size = len(buf)
				print('Cracked beacon', arch, 'dll size', size, 'bytes saved to', arch + '.dll')
			else:
				print('Decryption key: ' + hex(key))
				f.write(struct.pack(endian, c))
				for i in range(2+offset//4, len(buf)//4-4):
					a = struct.unpack_from(endian, buf, i*4)[0]
					b = struct.unpack_from(endian, buf, i*4+4)[0]
					с = a ^ b
					f.write(struct.pack(endian, с))
				print('Licensed beacon', arch, 'dll size', size, 'bytes saved to', arch + '.dll')
		f.close()
		extract_config(arch)
	else:
		print('Received HTTP code', resp.status_code, 'with content size', len(resp.content))

try:
	cs_url = sys.argv[1]
except:
	sys.exit('Usage: ' + sys.argv[0] + ' cs_url\ncs_url must be without path (last slash), like http://127.0.0.1:80')

get_beacon(cs_url, '/ab2g', 'x86')
get_beacon(cs_url, '/ab2h', 'x64')
