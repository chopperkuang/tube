var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var ArticleSchema = new Schema({
      title: {type:String, default:'', trim:true}
    , content: {type:String, default:'', trim:true}
    , user: {type:Schema.ObjectId, ref:'User'}
    , categoryName: {type:String, default:'', trim:true}
    , comments: [{type : Schema.ObjectId, ref : 'Comment'}]
    , createdAt:{type:Date, default:Date.now}
    , updatedAt:{type:Date, default:Date.now}
});

ArticleSchema.statics.count = function() {
    return this.count({});
}

mongoose.model('Article', ArticleSchema);