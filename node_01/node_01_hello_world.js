var http = require('http');

http.createServer(function (req, res) {
  console.log('novo request ' + new Date());

  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  res.end('Ola mundo');
}).listen('9000');
