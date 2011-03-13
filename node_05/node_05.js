var net = require('net')
	, carrier = require('carrier')
	, connection_list = []
	;

net.createServer(function (conn) {
	connection_list.push(conn);
	
	conn.on('close', function () {
		var idx = connection_list.indexOf(conn);
		if (idx >= 0) {
			connection_list.splice(idx, 1);
		}
	});
	
	conn.write('Ola, bem vindo a este chat!\n');
	conn.write('Qual o seu nome?\n');
	
	var username = null;
	
	carrier.carry(conn, function (line) {
		if (!username) {
			username = line;
			conn.write('Ola ' + username + '!\n');
			return;
		}
		
		if (line === 'quit') {
			conn.end();
			return;
		}
		
		var feedback = username + ': '  + line + '\n';
		
		connection_list.forEach(function (connection) {
			connection.write(feedback);
		});
	});
}).listen(4000);
