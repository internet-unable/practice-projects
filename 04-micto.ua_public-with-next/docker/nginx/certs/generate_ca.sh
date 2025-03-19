#!/bin/bash

echo "Certificate authority (CA): generate RootCA.pem, RootCA.key & RootCA.crt..."

if [ "$1" = "" ]
then
  SUBJECT="/C=UA/CN=Micto-Root-CA"
else
  SUBJECT=$1
fi

openssl req -x509 -nodes -new -sha256 -days 365 -newkey rsa:2048 \
  -keyout "$PWD"/RootCA.key \
  -out "$PWD"/RootCA.pem \
  -subj "$SUBJECT"

openssl x509 -outform pem -in "$PWD"/RootCA.pem -out "$PWD"/RootCA.crt
