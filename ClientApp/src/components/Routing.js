import React from 'react'
import {useState,useEffect} from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserContext from '../Context/userContext';
import NavBar from './NavBar';
import { News } from './News';



export const Routing = () => {

const [user,setUser]=useState({
  userName:'',
  profilpic:'',
  posts:[],
  token:''
})

  

  return (
   
      <UserContext.Provider value={{user,setUser}}>

        <BrowserRouter>

        <NavBar />

        <Routes>
              
        <Route path='/News' element={<News />} />
       
    

        </Routes>
        
      
        
        </BrowserRouter>

      </UserContext.Provider>

  )
}
