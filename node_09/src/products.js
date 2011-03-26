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

module.exports.all = products;

module.exports.find = function (id) {
    var productFound = false
        , product = null
        , productQuantity = products.length
        , idx = 0
        ;
    if (typeof id !== 'number') {
        id = parseInt(id, 10);
        if (isNaN(id)) {
            productFound = true;
            product = {
                id: 0
                , name: 'A procura deve ser um numero'
                , description: 'A procura deve ser um numero'
                , price: 0
            };
        }
    }
    
    while (!productFound) {
        if (idx < productQuantity) {
            product = products[idx];
            if (product.id === id) {
                productFound = true;
            }
            idx += 1;
        } else {
            productFound = true;
            product = {
                id: 0
                , name: 'Produto nao encontrado'
                , description: 'Produto nao encontrado'
                , price: 0
            };
        }
    }
    
    return product;
}
