#!/bin/bash

IPADDRESS="$(ip address | grep 'state UP' -A2 | tail -n1 | awk '{print $2}' | cut -f1  -d'/')"
PASS="rockyou"

/usr/sbin/sshd -D &
cd /opt/
tar zxf cobaltstrike-trial.tgz
cd /opt/cobaltstrike/
/opt/cobaltstrike/teamserver $IPADDRESS $PASS

