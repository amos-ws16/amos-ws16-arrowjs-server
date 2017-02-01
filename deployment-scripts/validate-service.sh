#!/bin/bash
my_dir="$(dirname "$0")"
source $my_dir/config.cfg

echo "validate that amos server is running ..."
sleep 10
output="$(curl -I -sS --request GET http://localhost:${AMOS_PORT}/api/welcome)"

if [[ ${output[0]} == "HTTP/1.1 200 OK"* ]]
then
  echo "Server is started!"
  exit 0
else
  echo "Server is not started!"
  exit 1
fi
