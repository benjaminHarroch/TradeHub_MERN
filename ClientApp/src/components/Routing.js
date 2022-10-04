import React from 'react'
import {useState,useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from '../Context/userContext';
import { HomePage } from './HomePage';
import NavBar from './NavBar';
import { News } from './News';
import axios from 'axios';



export const Routing = () => {

const [user,setUser]=useState({
  user_id:'',
  userName:'',
  profilepic:'',
  posts:[],
  token:''
})

const token=window.localStorage.getItem("x-access-token");


useEffect(()=>{ 

{token&&axios.post(`http://localhost:8000/auth/getUserWithtoken`, {},{ headers: {"x-access-token":token}})
              .then(res => {
              console.log(res);
              setUser({
                 
                 user_id:res.data._id,
                 userName:res.data.userName,
                 profilepic:res.data.profilepic,
                 posts:res.data.posts,
                 token:token,

              });              

            }).catch((e=>{
               console.log('error with the toke session ',e); 
}));}

},[])
  

  return (
   
      <UserContext.Provider value={{user,setUser}}>

        <BrowserRouter>

        <NavBar />

        <Routes>
              
        <Route path='/News' element={<News />} />
        <Route path='/' element={<HomePage />} />
       
    

        </Routes>
        
      
        
        </BrowserRouter>

      </UserContext.Provider>

  )
}
