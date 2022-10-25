

import { Avatar, Input } from '@mui/material';
import axios from 'axios';
import React, { useEffect,useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from './Post';
import '../css/profile.css'
import styled from 'styled-components';
import {UploadPhoto} from './UploadPhoto';
import UserContext from '../Context/userContext';


export const Profile = () => {

    const {userid}=useParams();
    const [userProfile ,setUserProfile]=useState();
    const [postProfile ,setPostProfile]=useState([]);
    const [cliked,setCliked]=useState('notvisible');
    const [postResponse,setpostResponse]=useState();
    const {user,setUser}=useContext(UserContext);

    function getProfileFromDb(){

       axios.get(`https://juniortraders.onrender.com/auth/getuser/${userid}`)
       .then((res)=>setUserProfile(res.data[0]))
       .catch(error=>console.log(error))

      
    }
    
   async function  getPostofThisId(posts){
      
      let arrayPost=[];

          for(let i=0;i<posts.length;i++){
          
              //console.log(posts[i])
            const response =await axios.get(`https://juniortraders.onrender.com/post/getspecificePost/${posts[i]}`);
            const data=await response.data;
            arrayPost=[data,...arrayPost]
            //console.log(arrayPost)
          }
      //console.log('out')
      setPostProfile(arrayPost);

   }

    useEffect(()=>{

     getProfileFromDb();
    
    },[userid])

    useEffect(()=>{

        (userProfile&&getPostofThisId(userProfile.posts))
      // console.log('userprofile',userProfile)
     },[userProfile])
   

     const UserPost=styled.div`
     
     font-size:2em;
     font-weight: 700;
     color:#00ADB5;
     padding:2em

     `


    


  return (

    <div className='containerProfilePage'>

        <div className='profileAvatar'>

            <div className='profileImg'>{userProfile?.profilepic!=''?<img src={userProfile?.profilepic} alt={"profilePhoto"} />:<UploadPhoto userProfile={userProfile} setUserProfile={setUserProfile}/>}</div>
            <div className='profileUserName'>{userProfile?.userName}</div>
            <div className='profileUserName'>{userProfile?.trades.length>10?'expert':'new trader'}</div>
            <div className='profileUserName'>{"amount of trades : "+ userProfile?.trades.length}</div>

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
