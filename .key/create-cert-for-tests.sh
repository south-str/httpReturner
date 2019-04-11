#!/bin/bash

# See Node.js document http2 section
# https://nodejs.org/dist/latest-v11.x/docs/api/http2.html#http2_http_2
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout localhost-privkey.pem -out localhost-cert.pem
