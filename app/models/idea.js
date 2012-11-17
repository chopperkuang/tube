var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var getTags = function (tags) {
    return tags.join(',')
}

var setTags = function (tags) {
    return tags.split(',')
}

var IdeaSchema = new Schema({
    content : {type: String, default: '', trim: true},
    imgPath : {type: String, default: '', trim: true},
    productName: {type: String, default: '', trim: true},
    user: {type:Schema.ObjectId, ref:'User'},
    comments: [{type : Schema.ObjectId, ref : 'Comment'}],
    tags: {type: [], get: getTags, set: setTags},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:''}
});

IdeaSchema.path('content').validate(function (content) {
    return content.length > 0
}, 'Idea content cannot be blank')

mongoose.model('Idea', IdeaSchema);