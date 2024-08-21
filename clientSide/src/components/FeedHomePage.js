/*import React from 'react'
import StorysContainer from './StorysContainer'
import "./css/FeedHomePageContainer.css"
import PostFeed from './PostFeed'
import AddPost from './AddPost'
import { useState,useEffect } from 'react';
import axios from 'axios';

function FeedHomePage() {

  const [posts,setPost]=useState([])

  useEffect(()=>{

      //fetch data from data base
      fetchPostsFromDb();

    },[])
    

  const timestamp = new Date(); 

  function fetchPostsFromDb(){

      axios.get(`http://localhost:8000/post/getAllPost`)
      .then(res => {
        console.log('res',res);
        //get array of all the post in the app
        setPost(res?.data.reverse());
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

export default FeedHomePage;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StorysContainer from './StorysContainer';
import AddPost from './AddPost';
import PostFeed from './PostFeed';
import "./css/FeedHomePageContainer.css"; // Ensure to create and import this CSS file for custom styles

function FeedHomePage() {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPostsFromDb();
    }, []);

    const fetchPostsFromDb = () => {
        axios.get(`http://localhost:8000/post/getAllPost`)
            .then(res => {
                setPost(res?.data.reverse());
                setLoading(false);
            })
            .catch(err => {
                console.log("error", err.response);
                setError('Failed to fetch posts. Please try again.');
                setLoading(false);
            });
    };

    return (
        <div className='FeedHomePageContainer'>
            <StorysContainer />
            <AddPost posts={posts} setPost={setPost} />
            {loading ? (
                <div className='loading-container'>
                    Loading posts...
                </div>
            ) : error ? (
                <div className='error-container'>
                    {error}
                </div>
            ) : (
                <PostFeed posts={posts} setPost={setPost} />
            )}
        </div>
    );
}

export default FeedHomePage;

