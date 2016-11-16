#!/bin/bash
my_dir="$(dirname "$0")"
source $my_dir/config.cfg

echo "execute before installing amos app"
rm -R $INSTALL_DIR/node_modules
