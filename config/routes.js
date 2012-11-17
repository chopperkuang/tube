var mongoose = require('mongoose')
    , Idea = mongoose.model('Idea')
    , User = mongoose.model('User')
    , async = require('async');


module.exports = function (app, passport, auth) {
	var users = require('../app/controllers/users')
	app.get('/login', users.login);
	app.get('/logout', users.logout);
	app.get('/users', users.create);

    app.get('/users/session', passport.authenticate('local', {failureRedirect: '/login'}),  users.session);

    //products routes
    var products = require('../app/controllers/products.js');
    app.get('/products', products.index);

    //idea routes
    var ideas = require('../app/controllers/ideas.js');
    app.get('/ideas', auth.requiresLogin, ideas.index);
    app.get('/ideas/new', auth.requiresLogin, ideas.new);
    app.get('/ideas/create', auth.requiresLogin, ideas.create);
    app.get('/ideas/:id', auth.requiresLogin, ideas.show);

    app.param('id', function(req, res, next, id) {
        Idea.findOne({_id: id})
            .populate('user', 'name')
            .populate('comments')
            .exec(function (err, idea) {
                if (err)  return res.jsonp({status: 'fail2'});
                if (!idea) return res.jsonp({status: 'fail', message: 'Failed to load idea ' + id});
                req.idea = idea;

                var populateComments = function (comment, cb) {
                    User
                        .findOne({ _id: comment._user })
                        .select('_id name')
                        .exec(function (err, user) {
                            if (err) return next(err)
                            comment.user = user
                            cb(null, comment)
                        })
                }

                if (idea.comments.length) {
                    async.map(req.idea.comments, populateComments, function (err, results) {
                        next(err)
                    })
                } else {
                    next();
                }
            });
    });

    //comment routes
    var comments = require('../app/controllers/comments.js');
    app.get('/ideas/:id/comments/create', auth.requiresLogin, comments.create);

}