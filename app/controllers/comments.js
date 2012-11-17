var mongoose = require('mongoose')
    , Comment = mongoose.model('Comment');


exports.create = function(req, res) {
    var content = req.query.content;
    var comment = new Comment({content: content});
    var idea = req.idea;

    comment._user = req.user;

    comment.save(function(err){
        if(err) res.jsonp({status:'fail', message: '添加失败！'});
        idea.comments.push(comment._id);
        idea.save(function(err){
            if(err) res.jsonp({status:'fail', message: '添加失败2！'});
            res.jsonp({status: 'ok'});
        });
    });
}
