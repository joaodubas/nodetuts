var http = require('http')
	, fs = require('fs')
	, util = require('util')
	, ws = require('./src/ws/ws.js')
	, clients = []
	, broadcast = function (showAll, clientList, sender, message) {
		clientList.forEach(function (client) {
			if (showAll || client !== sender) {
				client.write(message);
			}
		});
	}
	;

http.createServer(function (req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	
	var rs = fs.createReadStream(__dirname + '/template.html');
	
	util.pump(rs, res, function (pump_err) {
		if (pump_err) {
			throw pump_err;
		}
	});
}).listen(4000);

ws.createServer(function (websocket) {
	var username = null;
	
	websocket.on('connect', function (resource) {
		clients.push(websocket);
		websocket.write('Fala seu pulha!!!!')
		websocket.write('Não que eu me interesse, mas qual o teu nome?');
	});
	
	websocket.on('data', function (data) {
		var feedback = ''
			, showAll = true
			;

		if (!username) {
			username = data.toString();
			websocket.write('Porque você está aqui ' + username + '?');
			feedback = username + ' esta na sala!';
			showAll = false;
		} else {
			feedback = username + ' falou: ' + data.toString();
			showAll = true;
		}
		
		broadcast(showAll, clients, websocket, feedback);
	});
	
	websocket.on('close', function () {
		var idx = clients.indexOf(websocket)
			, feedback = username + ' abandonou vocês!';
			;
		
		if (idx >= 0) {
			clients.splice(idx, 1);
		}
		
		broadcast(true, clients, websocket, feedback);
	});
}).listen(8080);
