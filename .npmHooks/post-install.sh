#!/bin/bash

gulp hook

rm node_modules/lib
ln -s `pwd`/lib ./node_modules/lib
