
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

router.get('/getspecificePost/:postId',async (req,res)=>{

  const _id=req.params.postId;

  try{
  
  const Post=await PostModel.findById({_id});
  return  serverResponse(res,200,Post);

  }catch(e){

    return   serverResponse(res,500,"the request to fetch all post is failed");
  }

})

router.post('/addPost',async (req,res)=>{


    try{

    const {description,image,user_id,numOfLike,date,userName}=req.body;
    const newPostFromClient={description,image,user_id,numOfLike,date,userName};
    const newPost=new PostModel(newPostFromClient);
    await newPost.save();
    return  serverResponse(res,200,{postid:newPost._id});

    }catch(e){

      return   serverResponse(res,500,"the try to post data into the data base is failed");
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
            return  serverResponse(res,200,"the post have been updated");

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
    return  serverResponse(res,200,"the post have been delete from POST DB");

    }catch(e){

      return   serverResponse(res,500,"the request to delete failed");
    }

})

router.put('/liketopost/:postid',async (req,res)=>{ 

  const userId=req.body.userId;
  const postid=req.params.postid;

   try{


       const post=await PostModel.findById({_id:postid});

       if(post){

         post.liked.push(userId);
         await post.save();
         return serverResponse(res,200,"success to add like");
       

       }

   }catch(e){

     return   serverResponse(res,500,"the request to add post to this user is failed");
   }

})

router.put('/unliketopost/:postid',async (req,res)=>{ 

  const userId=req.body.userId;
  const postid=req.params.postid;

   try{


       const post=await PostModel.findById({_id:postid});

       if(post){

        const indexToRemove= post.liked.indexOf(userId);
        post.liked.splice(indexToRemove, 1);
         await post.save();
         return serverResponse(res,200,"success to remove like");
       

       }

   }catch(e){

     return   serverResponse(res,500,"the request to add post to this user is failed");
   }

})



module.exports =router;