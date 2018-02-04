#!/bin/sh

rm -rf output/*
./sample1.sh
cat output/beacon1.txt
./sample2.sh
cat output/beacon2.txt
