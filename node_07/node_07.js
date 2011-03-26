var http = require('http')
	, fs = require('fs')
	, util = require('util')
	, io = require('socket.io')
	;

var server = http.createServer(function (req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	
	var rs = fs.createReadStream(__dirname + '/template.html');
	
	util.pump(rs, res, function (pump_err) {
		if (pump_err) {
			throw pump_err;
		}
	});
});

var socket = io.listen(server);

server.listen(4000);

socket.on('connection', function (client) {
	var username = null;

	client.send('Putz grila, mais um chato!!!');
	client.send('Quem tu é?');
	
	client.on('message', function (message) {
		if (!username) {
			username = message;
			client.send('Buenos ' + username);
			socket.broadcast(username + ' esta na área!');
			return;
		}
		
		socket.broadcast(username + ' regurgitou: ' + message);
	});
	
	client.on('disconnect', function () {
		socket.broadcast(username + ' deixou o recinto!', client.sessionId);
	});
});
