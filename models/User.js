const mongoose = require('mongoose');


const UserSchema =new mongoose.Schema({


    userName:{type:String,required:true},
    password:{type:String,required:true},
    profilepic:{type:String},
    posts:[{ type :mongoose.Schema.Types.ObjectId, ref: 'Post' }],


})

const UserModel =mongoose.model('User',UserSchema);

module.exports=UserModel;
