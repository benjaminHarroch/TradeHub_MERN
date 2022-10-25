
import React from 'react'
import axios from 'axios';
import { useState ,useEffect,useContext } from 'react';
import UserContext from '../Context/userContext';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import '../css/addPost.css'
import styled from 'styled-components';

export const AddPost = ({post,setPost,cliked,setCliked}) => {

  const {user,setUser}=useContext(UserContext);
  //const [cliked,setCliked]=useState('notvisible')

  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [image,setImage]=useState('');
  const [error,setError]=useState('');
  let flage=false;
  let newPost;
  let postid;

  const ErrorMessage=styled.div`
  color: red;
  text-align: center;
  margin-top: 1em;
  `
  

  const LoginMessage=styled.div`
  color:#00ADB5;
  text-align: center;
  margin-top: 1em;
  font-size:1.1em;
  font-weight:600;
  `

  function updateArrayofUser(postid){

    console.log(postid);
    axios.put(`http://localhost:8000/auth/addposttouser/${user.user_id}`,{postid})
    .then((res)=>console.log())
    .catch((e)=>console.log(e));

  }

  function addNewPost(){

    setError('');

    if(title.length===0||description.length===0){

      setError('please fill all the field');
      flage=true;

    }

    if(!flage){
      
      newPost={

      user_id:user.user_id,
      title:title,
      description:description,
      numOfLike:0,
      image:image

    }

    console.log(newPost);
    
    axios.post('http://localhost:8000/post/addPost',newPost)
    .then((res)=>{ postid=res.data.postid; updateArrayofUser(postid);})
    .catch((e)=>console.log(e));
  


     const newPostArray=[newPost,...post];
     setPost(newPostArray);
    
  }

  }


  return (

    <div className={'addPostContainer'+cliked} >

      <div className='avatarPost'>
      {user.token&&<div className={'avataraddpost'+cliked}><Avatar src={user.profilepic} style={{ height: '70px', width: '70px' }} /> </div>}


      {user.token?<div className='inputs'> 
      <label>add a new post:</label>
      <input type='text' placeholder='title...' onClick={()=>setCliked('visible')} className='firstinput' onChange={(e)=>setTitle(e.target.value)} value={title}></input>
      <input type='text' placeholder='description...' className={cliked} onChange={(e)=>setDescription(e.target.value)} value={description}></input>
      </div>:<LoginMessage>for upload a new post pleas login befor</LoginMessage>}

      </div>

      {user.token?<div className='Button'>
        <label for="file-upload" class="custom-file-upload">
           {image!=''?'photo choosen':'upload a photo'}
        </label>
        <input id="file-upload" type="file" onChange={(e)=>setImage(e.target.value)} />
        <Button variant="contained" style={{  width: '12em',backgroundColor:'#00ADB5' }} onClick={()=>addNewPost()}>Add new Post</Button>
      </div>:<div></div>}

      <ErrorMessage>{error}</ErrorMessage>

    </div>
  )
}
