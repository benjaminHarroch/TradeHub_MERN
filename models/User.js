const mongoose = require('mongoose');


//user SChema : {userName,password,profilepic,posts,trades}
const UserSchema =new mongoose.Schema({

    userName:{type:String,required:true},
    password:{type:String,required:true},
    profilepic:{type:String,default: ''},
    posts:[{ type :mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    trades:[{ type :mongoose.Schema.Types.ObjectId, ref: 'trades' }],

})

const UserModel =mongoose.model('User',UserSchema);

module.exports=UserModel;
