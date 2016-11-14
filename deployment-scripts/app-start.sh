#!/bin/bash
source deployment-scripts/config.cfg
echo "start amos app"
cd $INSTALL_DIR
nohup npm run dev >/dev/null 2>&1 &
