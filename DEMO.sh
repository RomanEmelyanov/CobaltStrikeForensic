#!/bin/sh

rm -rf output/*
./sample1.sh
cat output/beacon1.txt
./sample2.sh
cat output/beacon2.txt
./sample3.sh
cat output/procdump3.txt
cat output/screenshot3.txt
./sample4.sh
cat output/beacon4_enc.txt
