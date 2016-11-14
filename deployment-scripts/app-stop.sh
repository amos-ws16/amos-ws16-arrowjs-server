#!/bin/bash
my_dir="$(dirname "$0")"
source $my_dir/config.cfg

echo "stop amos app"
$STOP_CMD
