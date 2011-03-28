var products = [
    {
        id: 1
        , name: 'Mac Book Prod'
        , description: 'Apple 13 inch Mac Book Pro Notebook'
        , price: 1000
    }
    , {
        id: 2
        , name: 'iPad'
        , description: 'Apple 64GB 3G iPad'
        , price: 899
    }
];

var indexOfProduct = function (id) {
    var idx = -1
        , counter = 0
        , productFound = false
        , product = null
        , productQuantity = products.length
        ;
    
    while (!productFound) {
        if (counter < productQuantity) {
            product = products[counter];

            if (product.id === id) {
                idx = counter;
                productFound = true;
            }
        } else {
            productFound = true;
        }
        counter += 1;
    }
    
    return idx;
};

var idOfProduct = function (id) {
    if (typeof id !== 'number') {
        id = parseInt(id, 10);
    }

    return id;
};

var lastProductId = function () {
    return products[(products.length - 1)]['id'];
}

module.exports.all = products;

module.exports.find = function (id) {
    var product = null
        , idx = -1
        ;
    id = idOfProduct(id);

    if (isNaN(id)) {
        product = {
            id: idx
            , name: 'A procura deve ser um numero'
            , description: 'A procura deve ser um numero'
            , price: 0
        };
    } else {
        idx = indexOfProduct(id);
        if (idx >= 0) {
            product = products[idx];
        } else {
            product = {
                id: idx
                , name: 'Produto nao encontrado'
                , description: 'Produto nao encontrado'
                , price: 0
            };
        }
    }
    
    return product;
};

module.exports.set = function (id, product) {
    var idx = -1;
    id = idOfProduct(id);
    
    if (!isNaN(id)) {
        product.id = id;
        
        idx = indexOfProduct(id);
        if (idx >= 0) {
            products[idx] = product;
        }
    }
};

module.exports.new = function () {
    return {
        name: ''
        , description: ''
        , price: 0
    };
};

module.exports.insert = function (product) {
    var id = lastProductId() + 1;
    product.id = id;
    products.push(product);
    return id;
};
