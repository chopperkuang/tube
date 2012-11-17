var mongoose = require('mongoose')
    , Category = mongoose.model('Category');

require('express-mongoose');

exports.index = function(req, res) {
    res.send(Category.all());
}