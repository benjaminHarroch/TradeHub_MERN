const express=require('express');
const jwt =require('jsonwebtoken');
const serverResponse=require('../utilsServer/serverResponse');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UserModel=require('../models/User');
const array=require('../utilsServer/arraysVallidator');


//get data from the env file 
require("dotenv").config();
const {KEY_SECRET}=process.env;


const router=express.Router();


const chekeIfExistUserName=async (userName)=>{
 
    const user =await UserModel.findOne({ userName});

   if(user){

    return user;

   }
   
}

const chekeIfExistUserNamewithThisPassword=async (userName,password)=>{

  const response= {
    
    message:'',
    user:'',
    userfound:false,
    userpasswordmatch:false
  }
 
  user=await UserModel.findOne({ userName});

  if(user){

    response.user=user;
    response.userfound=true;
    const match = await bcrypt.compare(password, user.password);
    if(match){
      response.userpasswordmatch=true;
      response.message="the user is found with a good password";
      response.user=user;
    }else{
      response.message="the user is found but wothout a good password";
    }

  }else{
    response.message="the user is not found";

  }

  return response;

}


router.get('/getAlluser',async (req,res)=>{


    try{
    
    const allUser=await UserModel.find({});
    return  serverResponse(res,200,allUser);

    }catch(e){

      return   serverResponse(res,500,"the request to fetch all comment is failed");
    }

})

router.get('/getuser/:userId',async (req,res)=>{

    const user_id=req.params.userId;

    try{
    
    const allUser=await UserModel.find({_id:user_id});
    return  serverResponse(res,200,allUser);

    }catch(e){

      return   serverResponse(res,500,"the request to fetch all post is failed");
    }

})

router.post("/getUserWithtoken", async (req,res)=>{

    
  try{

      const token=req.headers['x-access-token'];

      if(!token){

          return serverResponse(res,500,{message:"need to login"});
      }else{
              //decoded
              const decoded = jwt.verify(token,KEY_SECRET);
              console.log(decoded.id);
              const user= await UserModel.findById({_id:decoded.id})
              return serverResponse(res,200,user);

      }
  }catch(e){

      console.log(e);
      serverResponse(res,500,{message:"internal error occured"+e});
  }

})


router.post('/register',async (req,res)=>{


    try{

    const {userName,password,profilepic,posts}=req.body;
    const response=await chekeIfExistUserName(userName);

    if(response){
        return serverResponse(res,500,{message:"the user is already exist"});
    }

    bcrypt.hash(password, saltRounds, async function(err, hash) {
        // Store hash in your password DB.

        if(err){

            return serverResponse(res,500,{message:"an error uccured with your password"})
        }
         //if the user not exist so save the user in the data base and return token
            const newUser= new UserModel({userName,password:hash,profilepic,posts});
            await newUser.save();
            const IDuser=newUser._id;

            let token = jwt.sign({ id: IDuser },KEY_SECRET,{expiresIn:7200});
            return serverResponse(res,200,{token:token,message:"the register is success"});
    });

    }catch(e){

      return   serverResponse(res,500,"the request to put a user into the data base is failed because " + e);
    }

})

router.post('/login',async (req,res)=>{


    try{

    const {userName,password}=req.body;
    const response=await chekeIfExistUserNamewithThisPassword(userName,password);
    console.log(response);

    if(!response.userfound){

      return  serverResponse(res,500,{message:response.message});

    }
    if(!response.userpasswordmatch){

      return  serverResponse(res,500,{message:response.message});

    }

    const IDuser=response.user._id;
      //if everithing is good give me a confirmation token signature to log in
    let token = jwt.sign({ id: IDuser },KEY_SECRET,{expiresIn:7200});
    return serverResponse(res,200,{token:token,user:response.user,message:response.message});


    }catch(e){

      return   serverResponse(res,500,"the request to log in is failed");
    }

})

router.put('/editUser/:userId',async (req,res)=>{ 

   const userId=req.params.userId;

    try{

    const keyarrays=Object.keys(req.body);

    const updateIsValide=keyarrays.every((key)=>array.arraysValidationKeysUser.includes(key));

    if(!updateIsValide){

        return serverResponse(res,500,"you cant update this key");

    }else{

        const User=await UserModel.findById({_id:userId});

        if(User){

            keyarrays.forEach(key => User[key]=req.body[key]);
            await User.save();
            return  serverResponse(res,200,{user:User,message:"the user have beed update"});

        }else{

            return  serverResponse(res,500,"the post not exist");
        }

    }

    }catch(e){

      return   serverResponse(res,500,"the request to put into the data base");
    }

})


router.delete('/deleteuser/:userid',async (req,res)=>{

   const user_id=req.params.userid;

    try{
    
     await UserModel.findByIdAndDelete({_id:user_id});
    return  serverResponse(res,200,"the user have been delete");

    }catch(e){

      return   serverResponse(res,500,"the request delete failed");
    }

})

router.put('/addposttouser/:userId',async (req,res)=>{ 

     const userId=req.params.userId;
     const postID=req.body.postid;
  
      try{
  
  
          const user=await UserModel.findById({_id:userId});
  
          if(user){
  
            user.posts.push(postID);
            await user.save();
            return serverResponse(res,200,"success to update array post of the user");
          
  
          }
  
      }catch(e){
  
        return   serverResponse(res,500,"the request to add post to this user is failed");
      }
  
  })



module.exports =router;