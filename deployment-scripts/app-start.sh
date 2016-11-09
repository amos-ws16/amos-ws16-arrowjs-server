#!/bin/bash
echo "start amos app"
cd /home/ubuntu/amos-dev
nohup npm run dev >/dev/null 2>&1 &
