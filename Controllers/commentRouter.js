
const express=require('express');
const serverResponse=require('../utilsServer/serverResponse');
const CommentModel=require('../models/Comment');
const array=require('../utilsServer/arraysVallidator');




const router=express.Router();


router.get('/getAllcomment',async (req,res)=>{


    try{
    
    const allComment=await CommentModel.find({});
    return  serverResponse(res,200,allComment);

    }catch(e){

      return   serverResponse(res,500,"the request to fetch all comment is failed");
    }

})

router.get('/getCommentOfid/:postId',async (req,res)=>{

    const post_id=req.params.postId;

    try{
    
    const allComment=await CommentModel.find({post_id});
    return  serverResponse(res,200,allComment);

    }catch(e){

      return   serverResponse(res,500,"the request to fetch all post is failed");
    }

})

router.post('/addComment',async (req,res)=>{


    try{

    const {user_id,post_id,comment,numOfLike}=req.body;
    const newCommentFromClient={user_id,post_id,comment,numOfLike};
    const newComment=new CommentModel(newCommentFromClient);
    await newComment.save();
    return  serverResponse(res,200,"the comment is get into the data base");

    }catch(e){

      return   serverResponse(res,500,"the request to put into the data base");
    }

})

// router.put('/editPost/:postId',async (req,res)=>{ 

//    const postId=req.params.postId;

//     try{

//     const keyarrays=Object.keys(req.body);

//     const updateIsValide=keyarrays.every((key)=>array.arraysValidationKeys.includes(key));

//     if(!updateIsValide){

//         return serverResponse(res,500,"you cant update this key");

//     }else{

//         const Post=await CommentModel.findById({_id:postId});

//         if(Post){

//             keyarrays.forEach(key => Post[key]=req.body[key]);
//             await Post.save();
//             return  serverResponse(res,200,"the post is get into the data base");

//         }else{

//             return  serverResponse(res,500,"the post not exist");
//         }

//     }

//     }catch(e){

//       return   serverResponse(res,500,"the request to put into the data base");
//     }

// })


router.delete('/deletepost/:commentid',async (req,res)=>{

   const commentid=req.params.commentid;

    try{
    
     await CommentModel.findByIdAndDelete({_id:commentid});
    return  serverResponse(res,200,"the post have been delete");

    }catch(e){

      return   serverResponse(res,500,"the request to delete failed");
    }

})



module.exports =router;