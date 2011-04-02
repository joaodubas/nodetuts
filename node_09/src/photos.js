var fs = require('fs')
    , src_path = __dirname + '/../static/uploads'
    ;

module.exports.list = function (callback) {
    fs.readdir(src_path, function (err, files) {
        var file_list = [];

        files.forEach(function (file) {
            if (!/^\./.test(file)) {
                file_list.push('/uploads/' + file);
            }
        });

        callback(err, file_list);
    });
};
