



import axios from 'axios';
import React from 'react';
import { useState ,useEffect,useContext } from 'react';
import UserContext from '../Context/userContext';
import { AddPost } from './AddPost';
import { Post } from './Post';
import '../css/HomePage.css'




export const HomePage = () => {


    const [post,setPost]=useState([]);
    const [cliked,setCliked]=useState('notvisible')
    const {user,setUser}=useContext(UserContext);

    
    function getPostFromDb(){


        axios.get(`http://localhost:8000/post/getAllPost`)
        .then(res => {
          console.log('res',res);
          setPost(res.data);
        }).catch(err=>console.log(err.response.data.message));


    }



    useEffect(()=>{


        getPostFromDb();


    },[])

    
    useEffect(()=>{


      console.log('post from homep page',post);


  },[post])
  

  return (


    <div className='containerHomePage' >

        <AddPost post={post} setPost={setPost} cliked={cliked} setCliked={setCliked} />

        {
        
        post.map((item)=>

        
        <Post 
        cliked={cliked}
        setCliked={setCliked}
        user_id={item.user_id}
        description={item.description}
        title={item.title}
        image={item.image}
        numOfLike={item.numOfLIke}
        postid={item._id}
        liked={item.liked}
        />
        
        )} 


    </div>


  )

}


/*
description
: 
"this is the new momentuon stock for the week pleas follow me and give a likie sdsdg sdgsg"
image
: 
"https://th.bing.com/th/id/OIP.zUDVWGRKDte1W9TR65ZB0gHaF0?w=226&h=180&c=7&r=0&o=5&pid=1.7"
numOfLIke
: 
0
title
: 
" stock fasaf"
user_id
: 
"632abbc9d22fdd37f4fb36ae"
__v
: 
0
_id
: 
"632acf936e6199cf64192c01"*/