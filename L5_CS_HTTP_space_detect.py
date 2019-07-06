#!/usr/bin/python3

# -*- coding: utf-8 -*-

"""
Script for detect Cobalt Strike team server
Usage example: ./script.py http://cs_host:cs_port
https://blog.fox-it.com/2019/02/26/identifying-cobalt-strike-team-servers-in-the-wild/
https://github.com/NanoHttpd/nanohttpd-java-1.1/blob/nanohttpd-for-java1.1/NanoHTTPD.java#L778
https://www.cobaltstrike.com/releasenotes.txt:
January 2, 2019 - Cobalt Strike 3.13
+ Removed extraneous space from HTTP status responses.
"""

import requests, sys, io, re

try:
    from urlparse import urlparse # py2
except:
    from urllib.parse import urlparse # py3

try:
    import http.client as http_client # py2
except ImportError:
    import httplib as http_client # py3

def is_url(x):
    try:
        r = urlparse(x)
        return all([r.scheme, r.netloc])
    except:
        return False
try:
	cs_url = sys.argv[1]
except:
	sys.exit('Give me URL as argument')
assert is_url(cs_url), 'input ' + cs_url + ' not URL'

ua = "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30)"
timeout = 10
sys.stdout = stdout_redirect = io.StringIO()
sys.stderr = stderr_redirect = io.StringIO()
http_client.HTTPConnection.debuglevel = 1
headers = {"User-Agent":ua}
try:
	resp = requests.get(cs_url, timeout=timeout, headers=headers, stream=True, verify=False)
except requests.exceptions.RequestException as e:
	print("ERROR: (HTTP get request)", str(e))
debug_reply = stdout_redirect.getvalue()
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
try:
    reply = re.findall("reply: '(.*)'", debug_reply)[0]
except:
    sys.exit('ERROR (unknown reply): ' + debug_reply + stderr_redirect.getvalue())
verdict = '"extraneous space" found, probably Cobalt Strike < 3.13' if(reply.endswith(r' \r\n')) else 'looks like normal WEB server'
print('Reply: ', reply, '\nVerdict: ', verdict)