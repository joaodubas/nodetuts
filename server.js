var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=UTF-8'
    });
    
    res.end('Temporariamente não disponível');
}).listen(80);
