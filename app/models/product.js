var mongoose = require('mongoose')
    , Schema = mongoose.Schema;


var ProductSchema = new Schema({
    name : {type:String, trim:true },
    ideaCount : {type : Number, default : 0},
    user: {type:Schema.ObjectId, ref:'User'},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now}
});

ProductSchema.statics.all = function() {
    return this.find({});
}

mongoose.model('Product', ProductSchema);