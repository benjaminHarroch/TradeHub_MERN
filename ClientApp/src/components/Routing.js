import React from 'react'
import {useState,useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from '../Context/userContext';
import { HomePage } from './HomePage';
import NavBar from './NavBar';
import { News } from './News';
import axios from 'axios';
import { Profile } from './Profile';
import { DayStock } from './DayStock';
import {TradeJournale} from './TradeJournale'
import BreakingNews from './BreakingNews';
import WatchList from './WatchList';


export const Routing = () => {

const [user,setUser]=useState({
  user_id:'',
  userName:'',
  profilepic:'',
  posts:[],
  token:'',
  trades:[]
})

const [arrayStock,setArrayStock]=useState([]);

const token=window.localStorage.getItem("x-access-token");


useEffect(()=>{ 

{token&&axios.post(`https://juniortraders.onrender.com/auth/getUserWithtoken`, {},{ headers: {"x-access-token":token}})
              .then(res => {
              
              setUser({
                 
                 user_id:res.data._id,
                 userName:res.data.userName,
                 profilepic:res.data.profilepic,
                 posts:res.data.posts,
                 token:token,
                 trades:res.data.trades
              });              
              //console.log(user);
            }).catch((e=>{
               console.log('error with the toke session ',e); 
}));}

axios.get(`https://juniortraders.onrender.com/getMomentumStok`).then(res => setArrayStock(res.data))
},[])
  

  return (
   
      <UserContext.Provider value={{user,setUser}}>

        <BrowserRouter>

        <NavBar />

        <Routes>
              
        <Route path='/News' element={<News />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/profile/:userid' element={<Profile />} />
        <Route path='/daystock' element={<DayStock arrayStock={arrayStock}/>} />
        <Route path='/Mytrade' element={<TradeJournale />} />
       
    

        </Routes>
        
        <WatchList />
        <BreakingNews />
        
        </BrowserRouter>

      </UserContext.Provider>

  )
}
