#!/bin/bash

echo "Domain name certificate: generate localhost.key, localhost.csr, and localhost.crt..."

if [ "$1" = "" ]
then
  SUBJECT="/C=UA/ST=Kyiv/O=Micto-Certificates/CN=localhost.local"
else
  SUBJECT=$1
fi

openssl req -new -nodes -newkey rsa:2048 \
  -keyout "$PWD"/localhost.key \
  -out "$PWD"/localhost.csr \
  -subj "$SUBJECT"

openssl x509 -req -sha256 -days 365 \
  -in "$PWD"/localhost.csr \
  -CA "$PWD"/RootCA.pem \
  -CAkey "$PWD"/RootCA.key -CAcreateserial \
  -extfile "$PWD"/alt_names.ini \
  -out "$PWD"/localhost.crt
