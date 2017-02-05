#!/bin/bash
# Use correct virtual hostname inside docker compose setup.
sed -i -e "s/host: '127.0.0.1'/host: 'mongo'/" config/test.js
