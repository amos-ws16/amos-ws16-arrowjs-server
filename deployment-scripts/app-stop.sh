#!/bin/bash
running=`ps aux | grep '\snode\s' | awk '{print $2}'`
if [$running = '']; then
  echo 'node not running'
else
  echo 'node running. stop'
  kill -9 $(ps aux | grep '\snode\s' | awk '{print $2}')
fi
