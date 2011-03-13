var http = require('http')
	, fs = require('fs')
	, util = require('util')
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
