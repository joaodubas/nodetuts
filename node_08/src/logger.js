var util = require('util');

module.exports = function () {
    var counter = 0;

    return function (req, res, next) {
        var writeHead = res.writeHead;
        
        counter += 1;

        res.writeHead = function (code, headers) {
            res.writeHead = writeHead;
            console.log('Response #' + counter + ': ' + code + ' | ' + util.inspect(headers));
            res.writeHead(code, headers);
        };
        
        next();
    };
};
