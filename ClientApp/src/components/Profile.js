

import { Avatar } from '@mui/material';
import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from './Post';
import '../css/profile.css'
import styled from 'styled-components';


export const Profile = () => {

    const {userid}=useParams();
    const [userProfile ,setUserProfile]=useState();
    const [postProfile ,setPostProfile]=useState([]);
    const [cliked,setCliked]=useState('notvisible');
    const [postResponse,setpostResponse]=useState();
    

    function getProfileFromDb(){

       axios.get(`http://localhost:8000/auth/getuser/${userid}`)
       .then((res)=>setUserProfile(res.data[0]))
       .catch(error=>console.log(error))

      
    }
    
   async function  getPostofThisId(posts){
    
    let arrayPost=[];

     for(let i=0;i<posts.length;i++){
    
        console.log(posts[i])
      const response =await axios.get(`http://localhost:8000/post/getspecificePost/${posts[i]}`);
      const data=await response.data;
      arrayPost=[data,...arrayPost]
      //console.log(arrayPost)
     }
     console.log('out')
      setPostProfile(arrayPost);

   }

    useEffect(()=>{

     getProfileFromDb();
    
    },[])

    useEffect(()=>{

        (userProfile&&getPostofThisId(userProfile.posts))
       
     },[userProfile])
   

     const UserPost=styled.div`
     
     font-size:2em;
     font-weight: 700;
     color:#00ADB5;
     margin:1em

     `


    


  return (

    <div className='containerProfilePage'>

        <div className='profileAvatar'>
            <div className='profileImg'><img src={userProfile?.profilepic} /></div>
            <div className='profileUserName'>{userProfile?.userName}</div>
        </div>

        <div className='profilePost'>

           {postProfile.length>0?<UserPost> User Post : </UserPost>:<UserPost>this user not posted yet </UserPost>}

            {postProfile?.map((p)=>{

                

                return(
                
               <Post 
                cliked={cliked}
                setCliked={setCliked}
                user_id={p.user_id}
                description={p.description}
                title={p.title}
                image={p.image}
                numOfLike={p.numOfLIke}
                postid={p._id}
                liked={p.liked}
               />)
                

            })
            
            
            
            
            
        }

        </div>

    </div>

  )
}
