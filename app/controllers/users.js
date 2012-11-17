var mongoose = require('mongoose')
    , User = mongoose.model('User');

exports.login = function (req, res) {
    res.jsonp({status:'fail', message: '请先登录!'});
}

exports.session = function (req, res) {
    res.jsonp({status:'ok'});
}

exports.logout = function(req, res) {
    req.logout();
    res.jsonp({status:'ok'});
}

exports.create = function (req, res) {
    var user = new User({name: req.query.name, email: req.query.email, password: req.query.password});
    user.save(function (err) {
        if (err) return res.jsonp({status:'fail', message : '注册失败', errors:err.errors});

        res.jsonp({status:'ok'});
    });
}