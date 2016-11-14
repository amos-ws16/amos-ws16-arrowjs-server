#!/bin/bash
source deployment-scripts/config.cfg

echo "execute before installing amos app"
rm -R $INSTALL_DIR/node_modules
