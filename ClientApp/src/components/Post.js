


import { Avatar } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useState ,useEffect,useContext } from 'react';
import UserContext from '../Context/userContext';
import { AddPost } from './AddPost';
import '../css/post.css'
import styled from 'styled-components';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useNavigate } from 'react-router-dom';
import BuildIcon from '@mui/icons-material/Build';
import { Poper } from './Poper';


export const Post = ({description,title,image,numOfLike,user_id,postid,cliked,setCliked,liked}) => {


  const [userPost,setUserPost]=useState({

   userName:'',
   image:''

  })

  const {user}=useContext(UserContext);
  console.log(user);

  const [like,setLike]=useState(numOfLike);
  const [likeCliked,setLikeCliked]=useState(false);

  const navigate =useNavigate();

  function chekeIfalreadydolike(){

    if(liked.includes(user_id)){

      setLikeCliked(true);
    }


  }


  useEffect(()=>{
   
    chekeIfalreadydolike()

  },[])
  
  const UserName=styled.div`
  
  font-weight: 600;
  margin-left:1em;
  
  `

  const LikeButton=styled.div`
  display:flex;
  flex-direction:row-reverse;
  margin-right: 1em;
  color:#fff;
  cursor:pointer;

   @media only screen and (max-width: 1000px){
     
    font-size:0.8em;

   }


  `

  function chekeIfLikeCliked(){

    if(user.user_id.length<1){
      return
    }

    let newlike;

   if(likeCliked){
    
    newlike=like-1;
    setLike((prev)=>prev-1);
    setLikeCliked(false);

    axios.put(`http://localhost:8000/post/unliketopost/${postid}`,{userId:user_id})
    .then((res)=>console.log(res))
    .catch((e)=>console.log(e))

   }else{
    
    newlike=like+1;
    setLike((prev)=>prev+1);
    setLikeCliked(true);

    axios.put(`http://localhost:8000/post/liketopost/${postid}`,{userId:user_id})
    .then((res)=>console.log(res))
    .catch((e)=>console.log(e))

   }

   axios.put(`http://localhost:8000/post/editPost/${postid}`,{numOfLIke:newlike})
    .then((res)=>console.log(res))
    .catch((e)=>console.log(e))


  }

  function getProfileWhoPostThePost(){
     

    axios.get(`http://localhost:8000/auth/getuser/${user_id}`)
    .then(res => {

      setUserPost({
        
        userName:res.data[0].userName,
        image:res.data[0].profilepic

      })

    }).catch(err=>console.log('error form api for get user',err.response.data.message));



  }


     useEffect(()=>{

      getProfileWhoPostThePost()
   

    },[])


  return (


    <div className='containerPost' onClick={()=>setCliked('notvisible')} >

         <div className='avatarPostdiv' onClick={()=>navigate(`/profile/${user_id}`)}> <Avatar  alt="pofile pic" src={`${userPost.image}`}/> <UserName>{userPost.userName}</UserName> </div>
         {user.user_id==user_id&&<div className='buildicon'><Poper postid={postid} /></div>}

         <div className='imagePost'>{ image&&<img src={`${image}`} alt='photo'></img>} </div>

         <LikeButton onClick={()=>chekeIfLikeCliked()}><div style={{    
              'padding':'0 1em'
             }}>{like}</div>{likeCliked?<ThumbUpIcon style={{'background-color':'#00ADB5'}}/>:<ThumbUpIcon />}</LikeButton>

         <div className='titlePost'>{title} </div>

         <div className='descriptionPost'>{description} </div>

         

    </div>


  )

}
