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
		
		fs.readFile(file_path, function (err, file_content) {
			res.write(file_content);
			res.end();
		});
	}).listen(4000);
});

