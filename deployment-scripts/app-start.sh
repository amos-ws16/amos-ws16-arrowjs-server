#!/bin/bash
my_dir="$(dirname "$0")"
source $my_dir/config.cfg

echo "start amos app"
$START_CMD
