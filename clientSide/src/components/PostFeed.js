import React, {useState,useEffect } from 'react'
import "./css/Post.css"
import Post from "./Post";



function PostFeed({posts,setPost}) {

   //show all the post i get
   console.log('post from post',posts);
    return (
        posts?.map(post => <Post  setPost={setPost} posts={posts} postID={post._id}userId={post?.user_id} postImg={post.image}
        postUserName={post.userName} postTime={post.date} postDescription={post.description} />)
  )
}

export default PostFeed;