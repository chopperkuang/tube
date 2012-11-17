var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , Promise = mongoose.Promise;

var CategorySchema = new Schema({
    name: {type : String, default : '', trim : true}
  , createdAt  : {type : Date, default : Date.now}
});

CategorySchema.statics.all = function() {
    return this.find({});
}


mongoose.model('Category', CategorySchema);