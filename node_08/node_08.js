var connect = require('connect');

connect.createServer(
    require('./src/logger')(),
    require('./src/server')()
).listen(4000);
