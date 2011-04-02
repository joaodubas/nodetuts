/*
http://visionmedia.github.com/connect-form/
http://stackoverflow.com/questions/5149545/uploading-images-using-nodejs-express-and-mongo
http://groups.google.com/group/express-js/browse_thread/thread/a552d29f7d5fdc81?pli=1
*/

var express = require('express')
    , form = require('connect-form')
    ;

var app = express.createServer(
    form({
        keepExtensions: true
        , uploadDir: __dirname + '/static/uploads'
    })
);

app.configure(function () {
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/static'));
});

app.configure('development', function () {
    app.use(express.errorHandler({
        dumpExceptions: true
        , showStack: true
    }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.render('root');
});

var products = require('./src/products')
    , photos = require('./src/photos')
    ;

app.get('/products', function (req, res) {
    res.render('products/index', {
        locals: {
            products: products.all
        }
    });
});

app.get('/products/new', function (req, res) {
    photos.list(function (err, photo_list) {
        if (err) {
            next(err);
        }
        res.render('products/new', {
            locals: {
                product: req.body && req.body.product || products.new
                , photo_list: photo_list
            }
        });
    });
});

app.post('/products', function (req, res) {
    var id = products.insert(req.body.product);
    res.redirect('/products/' + id);
});

app.get('/products/:id', function (req, res) {
    var product = products.find(req.params.id);
    res.render('products/show', {
        locals: {
            product: product
        }
    })
});

app.get('/products/:id/edit', function (req, res) {
    photos.list(function (err, photo_list) {
        if (err) {
            next(err);
        }
        var product = products.find(req.params.id);
        res.render('products/edit',{
            locals: {
                product: product
                , photo_list: photo_list
            }
        });
    });
});

app.put('/products/:id', function (req, res) {
    var id = req.params.id;
    products.set(id, req.body.product);
    res.redirect('/products/' + id);
});

app.get('/photos', function (req, res) {
    photos.list(function (err, photo_list) {
        if (err) {
            next(err);
        }

        res.render('photos/index', {
            locals: {
                photo_list: photo_list
            }
        });
    });
});

app.get('/photos/new', function (req, res) {
    res.render('photos/new');
});

app.post('/photos', function (req, res, next) {
    req.form.complete(function (err, fields, files) {
        if (err) {
            next(err);
        } else {
            console.log('uploaded %s to %s', files.photo.filename, files.photo.path);
            res.redirect('/photos');
        }
    });
    
    req.form.on('progress', function (bytesReceived, bytesExpected) {
        var percent = (bytesReceived / bytesExpected) * 100 | 0;
        console.log('Uploading ' + percent + '%');
    });
});

app.listen(4000);
