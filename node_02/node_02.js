var http = require('http'),
    spawn = require('child_process').spawn
    ;

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    
    var tail_child = spawn('tail',
        ['-f', '/var/log/syslog']
    );
    
    req.connection.on('end', function () {
        tail_child.kill();
    });
    
    tail_child.stdout.on('data', function (data) {
        console.log(data.toString());
        res.write(data);
    });
    
}).listen(4000);
