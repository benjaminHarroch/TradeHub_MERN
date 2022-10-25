



import axios from 'axios';
import React from 'react';
import { useState ,useEffect,useContext } from 'react';
import UserContext from '../Context/userContext';
import { AddPost } from './AddPost';
import { Post } from './Post';
import '../css/HomePage.css'
import BreakingNews from './BreakingNews';




export const HomePage = () => {


    const [post,setPost]=useState([]);
    const [cliked,setCliked]=useState('notvisible')
    const {user,setUser}=useContext(UserContext);

    
    function getPostFromDb(){


        axios.get(`https://juniortraders.onrender.com/post/getAllPost`)
        .then(res => {
          //console.log('res',res);
          setPost(res.data);
        }).catch(err=>console.log(err.response.data.message));


    }



    useEffect(()=>{


        getPostFromDb();


    },[])

    
  

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


