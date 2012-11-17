var mongoose = require('mongoose')
    , Idea = mongoose.model('Idea')
    , Product = mongoose.model('Product')
    , async = require('async');

exports.new = function(req, res) {
    Product.find({}, function(err, products){
        res.jsonp({status: 'ok', products : products});
    });
}


exports.create = function(req, res) {
    var idea = new Idea({content:req.query.content, productName: req.query.productName});
    idea.user = req.user;

    idea.save(function(err){
        if(err) res.jsonp({status:'fail', message: err.errors});
        res.jsonp({status:'ok'});
    });
}

exports.show = function(req, res) {
    res.jsonp({status: 'ok', idea: req.idea});
}

exports.index = function(req, res) {
    Idea.find({})
        .populate('user', 'name')
        .sort({'createdAt' : -1})
        .exec(function(err, ideas){
            if(err) res.jsonp({status: 'fail', message: err.errors});
            res.jsonp({status: 'ok', ideas: ideas});
        });
}