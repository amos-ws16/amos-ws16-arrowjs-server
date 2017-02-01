#!/bin/bash
my_dir="$(dirname "$0")"
source $my_dir/config.cfg

echo "validate that amos server is running ..."
output="$(curl -k -I -sS --request GET ${URL}:${AMOS_PORT}/api/welcome)"
sleep 5


if [[ ${output[0]} == "HTTP/1.1 200 OK"* ]]
then
  echo "Server is started!"
  exit 0
else
  echo "Server is not started!"
  exit 1
fi
