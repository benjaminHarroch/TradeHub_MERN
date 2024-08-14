import React, {useState,useEffect } from 'react'
import "./css/Post.css"
import Post from "./Post";



function PostFeed({posts}) {

   
    return (
        posts?.map(post => <Post  userId={post.user_id} postImg={post.image}
        postUserName={post.userName} postTime={post.date} postDescription={post.description} />)
  )
}

export default PostFeed;