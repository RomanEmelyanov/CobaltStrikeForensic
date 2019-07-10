#!/usr/bin/python

# -*- coding: utf-8 -*-

"""
Cobalt Strike Team Server Fingerprint
Default Cert Search - https://censys.io/ipv4?q=87F2085C32B6A2CC709B365F55873E207A9CAA10BFFECF2FD16D3CF9D94D390C
"""
import sys, ssl, OpenSSL
from datetime import datetime

def format_subject_issuer(x509name):
    items = []
    for item in x509name.get_components():
        items.append('%s=%s' %  (item[0], item[1]) )
    return ", ".join(items);

def format_split_bytes(aa):
    bb = aa[1:] if len(aa)%2==1 else aa
    out = format(':'.join(s.encode('hex').lower() for s in bb.decode('hex')))
    return out
 
def format_split_int(serial_number):
    aa = "0%x" % serial_number
    return format_split_bytes(aa)

def format_asn1_date(d):
    return datetime.strptime(d.decode('ascii'), '%Y%m%d%H%M%SZ').strftime("%Y-%m-%d %H:%M:%S GMT")

try:
	cs_host = sys.argv[1]
	cs_port = int(sys.argv[2])
except:
	sys.exit('Usage example: ./script.py host port')

cert = ssl.get_server_certificate((cs_host, cs_port))
x509 = OpenSSL.crypto.load_certificate(OpenSSL.crypto.FILETYPE_PEM, cert)
fingerprint = x509.digest("sha256").replace(':', '')
if (fingerprint == r'87F2085C32B6A2CC709B365F55873E207A9CAA10BFFECF2FD16D3CF9D94D390C'):
	print('DEFAULT Cobale Strike CERTIFICATE DETECTED')
print("Serial Number: %s" % format_split_int(x509.get_serial_number()))
print("Not Before: %s Not After: %s" % (format_asn1_date(x509.get_notBefore()) , format_asn1_date(x509.get_notAfter()) ) )
print("Issuer: %s" % format_subject_issuer( x509.get_issuer() ) )
print("Subject: %s" % format_subject_issuer( x509.get_subject() ) )
print("Fingerprint (SHA256): %s" % fingerprint )

