var mongoose = require('mongoose')
  , Article = mongoose.model('Article')
  , async = require('async');


module.exports = function (app, passport, auth) {
	var users = require('../app/controllers/users')
	app.get('/login', users.login);
	app.get('/signup', users.signup);
	app.get('/logout', users.logout);
	app.post('/user', users.create);
	app.post('/users/session', passport.authenticate('local', {failureRedirect: '/login'}),  users.session);


	// article routes
    var articles = require('../app/controllers/articles');
    app.get('/articles', articles.index);
	app.get('/article/:id', articles.show);
    app.get('/articles/new', auth.requiresLogin, articles.new);
    app.post('/articles', auth.requiresLogin, articles.create);

    app.param('id', function(req, res, next, id) {
        Article.findOne({_id:id})
            .populate('user')
            .exec(function (err, article) {
                if (err) return next(err);
                if (!article) return next(new Error('Failed to load article ' + id))
                req.article = article;
                next();
            });
    });
	// categories routes
    var categories = require('../app/controllers/categories');
    app.get('/categories', categories.index);

	app.get('/', articles.index);
}