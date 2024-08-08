import React from 'react'
import StorysContainer from './StorysContainer'
import "./css/FeedHomePageContainer.css"
import PostFeed from './PostFeed'
import AddPost from './AddPost'
import { useState,useEffect } from 'react';
import axios from 'axios';

function FeedHomePage() {

  const [posts,setPost]=useState([{}])

  useEffect(()=>{

      //fetch data from data base
      fetchPostsFromDb();

    },[])
    

  const timestamp = new Date(); 

  function fetchPostsFromDb(){

      axios.get(`http://localhost:8000/post/getAllPost`)
      .then(res => {
        console.log('res',res);
        setPost(res?.data);
      }).catch(err=>console.log("error",err.response));
  
  }
  return (
    <div className='FeedHomePageContainer'>

        <StorysContainer />
        <AddPost posts={posts} setPost={setPost}/>
        <PostFeed posts={posts} setPost={setPost}/>

    </div>
  )
}

export default FeedHomePage