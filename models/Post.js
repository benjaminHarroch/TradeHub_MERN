
const mongoose = require('mongoose');

//post schema : {title,image,user_id,description,numOfLike,user_liked}
const PostShema =new mongoose.Schema({

    userName:{type:String},
    image:{type:String},
    user_id:{ type:mongoose.Schema.Types.ObjectId, ref: 'User' ,required:true},
    description:{type:String,required:true},
    numOfLIke:{type:Number,default:0},
    user_liked:[{ type :mongoose.Schema.Types.ObjectId, ref: 'User' }],
    date:{type:String}

})

const PostModel=mongoose.model("Post",PostShema);

module.exports=PostModel;