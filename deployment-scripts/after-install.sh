#!/bin/bash
my_dir="$(dirname "$0")"
source $my_dir/config.cfg

cd $INSTALL_DIR
npm install
