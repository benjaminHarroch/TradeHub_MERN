
const express=require('express');
const serverResponse=require('../utilsServer/serverResponse');
const PostModel=require('../models/Post');
const array=require('../utilsServer/arraysVallidator');




const router=express.Router();


router.get('/getAllPost',async (req,res)=>{


    try{
    
    const allPost=await PostModel.find({});
    return  serverResponse(res,200,allPost);

    }catch(e){

      return   serverResponse(res,500,"the request to fetch all post is failed");
    }

})

router.get('/getPostOfid/:userId',async (req,res)=>{

    const user_id=req.params.userId;

    try{
    
    const allPost=await PostModel.find({user_id});
    return  serverResponse(res,200,allPost);

    }catch(e){

      return   serverResponse(res,500,"the request to fetch all post is failed");
    }

})

router.post('/addPost',async (req,res)=>{


    try{

    const {title,description,image,user_id,numOfLike}=req.body;
    const newPostFromClient={title,description,image,user_id,numOfLike};
    const newPost=new PostModel(newPostFromClient);
    await newPost.save();
    return  serverResponse(res,200,{postid:newPost._id});

    }catch(e){

      return   serverResponse(res,500,"the request to put into the data base");
    }

})

router.put('/editPost/:postId',async (req,res)=>{ 

   const postId=req.params.postId;

    try{

    const keyarrays=Object.keys(req.body);

    const updateIsValide=keyarrays.every((key)=>array.arraysValidationKeysPost.includes(key));

    if(!updateIsValide){

        return serverResponse(res,500,"you cant update this key");

    }else{

        const Post=await PostModel.findById({_id:postId});

        if(Post){

            keyarrays.forEach(key => Post[key]=req.body[key]);
            await Post.save();
            return  serverResponse(res,200,"the post is get into the data base");

        }else{

            return  serverResponse(res,500,"the post not exist");
        }

    }

    }catch(e){

      return   serverResponse(res,500,"the request to put into the data base");
    }

})


router.delete('/deletepost/:postid',async (req,res)=>{

   const postid=req.params.postid;

    try{
    
     await PostModel.findByIdAndDelete({_id:postid});
    return  serverResponse(res,200,"the post have been delete");

    }catch(e){

      return   serverResponse(res,500,"the request to delete failed");
    }

})



module.exports =router;