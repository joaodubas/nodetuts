var http = require('http')
	, fs = require('fs')
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

		rs.on('data', function (file_content) {
			flushed = res.write(file_content);
			
			if (!flushed) {
				//if the content wasn't sent pause the
				//read stream
				rs.pause();
			}
		});
		
		res.on('drain', function () {
			//resume the read stream when the data is
			//sent to the receiver
			rs.resume();
		});

		rs.on('end', function () {
			res.end();
		})

	}).listen(4000);
});

