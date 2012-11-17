var mongoose = require('mongoose')
    , Product = mongoose.model('Product');

require('express-mongoose');

exports.index = function(req, res) {
    Product.find({}, function(err, products){
        if(err) res.jsonp({status:'fail'});
        res.jsonp({status:'ok', products: products});
    });
}