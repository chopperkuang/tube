var mongoose = require('mongoose')
    , Article = mongoose.model('Article')
    , Category = mongoose.model('Category');

require('express-mongoose');

exports.index = function(req, res) {

    Article.find({})
        .populate('user')
        .sort({'createdAt' : -1})
        .exec(function(err, articles) {
            res.render('article/index', {
                title: 'List of Articles',
                categories : Category.all(),
                articles : articles
            });
        });
}

exports.show = function(req, res) {
    res.render('article/show', {
        categories : Category.all(),
        title: req.article.title,
        article: req.article
    });
}

exports.create = function(req, res) {
    console.log(req.body);
    var article = new Article(req.body);
    article.user = req.user;

    article.save(function(err){
        console.log(article);
        if(err) res.send({status:'fail', message: "添加失败"});
        res.send({status:'ok', article: article});
    });
}

	