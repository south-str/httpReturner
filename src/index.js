const fs = require('fs'),
  http = require('http'),
  https = require('https'),
  http2 = require('http2');

const httpServer = http.createServer((request, response) => {
  response
    .writeHead(200, {'Content-Type': 'text/plain'})
    .end('response');
});
httpServer.listen(3000);

const sslOptions = {
  key: fs.readFileSync(__dirname + '/../.key/localhost-privkey.pem'),
  cert: fs.readFileSync(__dirname + '/../.key/localhost-cert.pem')
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
