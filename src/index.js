'use strict';
const fs = require('fs'),
  util = require('util'),
  http = require('http'),
  https = require('https'),
  http2 = require('http2');

(async () => {
  const httpServer = http.createServer((request, response) => {
    response
      .writeHead(200, {'Content-Type': 'text/plain'})
      .end('response');
  });
  httpServer.listen(3000);

  const readFile = util.promisify(fs.readFile),
    sslOptions = {
      key: await readFile(__dirname + '/../.key/localhost-privkey.pem')
      .catch(err => {
        console.log(err);
        return err;
      }),
      cert: await readFile(__dirname + '/../.key/localhost-cert.pem')
      .catch(err => {
        console.log(err);
        return err;
      })
    },
    httpsServer = https.createServer(sslOptions, (request, response) => {
      response
        .writeHead(200, {'Content-Type': 'text/plain'})
        .end('secure response');
    });
  httpsServer.listen(3001);

  const http2Server = http2.createSecureServer(sslOptions);

  http2Server.on('stream', (stream, headers) => {
    stream.respond({
      'content-type': 'text/plain',
      ':status': 200
    });
    stream.end('http2 response');
  });
  http2Server.listen(3002);
})();
