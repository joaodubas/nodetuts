var http = require('http')
	, fs = require('fs')
	, util = require('util')
	, flushed = false
	, file_path = __dirname + '/cat.jpg'
	;

fs.stat(file_path, function (err, stat) {
	
	if (err) {
		throw err;
	}
	
	
	http.createServer(function (req, res) {
		
		res.writeHead(200, {
			'Content-Type': 'image/jpeg',
			'Content-Length': stat.size 
		});
		
		var rs = fs.createReadStream(file_path);

		util.pump(rs, res, function (rs_err) {
			if (rs_err) {
				throw rs_err;
			}
		});

	}).listen(4000);
});

