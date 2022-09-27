
const mongoose = require('mongoose');
//const {UserShema}=require('./User';)


const PostShema =new mongoose.Schema({


    title:{type:String,required:true},
    image:{type:String},
    user_id:{ type:mongoose.Schema.Types.ObjectId, ref: 'User' ,required:true},
    description:{type:String,required:true},
    numOfLIke:{type:Number,default:0},

})

const PostModel=mongoose.model("Post",PostShema);

module.exports=PostModel;