var fs = require('fs');

module.exports = function () {
    return function (req, res, next) {
        fs.readFile(req.url.replace(/^\/+/, ''), function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'application/javascript'
            });
            res.end(data);
        });
    };
};
