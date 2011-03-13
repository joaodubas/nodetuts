var http = require('http')
	, fs = require('fs')
	, file_path = __dirname + '/cat.jpg'
	;

fs.stat(file_path, function (stat_err, stat) {
	if (stat_err) {
		throw stat_err;
	}

	var file_size = stat.size;
	
	fs.readFile(file_path, function (read_err, file_content) {
		if (read_err) {
			throw read_err;
		}
		
		http.createServer(function (req, res) {
			
			res.writeHead(200, {
				'Content-Type': 'image/jpeg',
				'Content-Length': file_size
			});
			
			res.end(file_content);
			
		}).listen(4000);
	});
});
