
const mongoose = require('mongoose');

//schema for data base 
//coment -{user_id,post_id,_comment,_numOfLike}
const CommentShema =new mongoose.Schema({

    user_id:{ type:mongoose.Schema.Types.ObjectId, ref: 'User' ,required:true},
    post_id:{ type:mongoose.Schema.Types.ObjectId, ref: 'Post' ,required:true},
    comment:{type:String},
    numOfLike:{type:Number,default:0},

})

//'comment' -the name of the colletion in the db ,and 
const CommentModel =mongoose.model('Comment',CommentShema);

module.exports=CommentModel;