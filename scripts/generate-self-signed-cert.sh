#!/usr/bin/env sh
# Generate a self signed SSL certificate for use in node
# Following the instructions here:
# https://docs.nodejitsu.com/articles/HTTP/servers/how-to-create-a-HTTPS-server/

keyfile=key.pem
certfile=cert.pem
passphrase="SOMEPASSPHRASE"

# Old generation of keys
# openssl genrsa -out "$keyfile"
# openssl req -new -key "$keyfile" -out csr.pem
# openssl x509 -req -days 9999 -in csr.pem -signkey "$keyfile" -out "$certfile"

openssl genrsa -passout pass:$passphrase -out key.pass.pem 2048
openssl rsa -passin pass:x -in key.pass.pem -out "$keyfile"
rm key.pass.pem
openssl req -new -key "$keyfile" -out csr.pem
openssl x509 -req -days 365 -in csr.pem -signkey "$keyfile" -out "$certfile"

rm csr.pem
