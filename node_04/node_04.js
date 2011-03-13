var http = require('http')
	, fs = require('fs')
	, step = require('step')
	, file_path = __dirname + '/cat.jpg'
	, file_size = 0
	, file_content = null
	;

step(
	function getFileSize () {
		fs.stat(file_path, this);
	}
	, function storeFileSize (err, stat) {
		file_size = stat.size;
		this();
	}
	, function loadFileToMemory () {
		fs.readFile(file_path, this);
	}
	, function createServer (err, file_content) {
		
		http.createServer(function (req, res) {
			
			res.writeHead(200, {
				'Content-Type': 'image/jpeg',
				'Content-Length': file_size
			});
			
			res.end(file_content);
			
		}).listen(4000);

	}
);
