#!/usr/bin/bash
# Generate a self signed SSL certificate for use in node
# Following the instructions here:
# https://docs.nodejitsu.com/articles/HTTP/servers/how-to-create-a-HTTPS-server/

keyfile=key.pem
certfile=cert.pem

openssl genrsa -out "$keyfile"
openssl req -new -key "$keyfile" -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey "$keyfile" -out "$certfile"
rm csr.pem
