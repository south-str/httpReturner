const http = require('http');

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'text/plain');
  response.end('response');
});

server.listen(3000);
