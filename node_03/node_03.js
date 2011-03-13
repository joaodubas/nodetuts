var http = require('http')
	, fs = require('fs')
	;

var file_path = __dirname + '/cat.jpg';

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
		rs.on('data', function (file_content) {
			res.write(file_content);
		});
		rs.on('end', function () {
			res.end();
		})

	}).listen(4000);
});

