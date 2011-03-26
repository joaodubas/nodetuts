var http = require('http');alert

http.createServer(function (req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	
	res.end('Temporariamente não disponível');
});
