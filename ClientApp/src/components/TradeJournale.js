
import React from 'react'
import { CreatNewTrade } from './CreatNewTrade'
import MyAccordion from './MyAccordion'
import {useState ,useEffect,useContext} from 'react';
import UserContext from '../Context/userContext';
import axios from "axios";


export const TradeJournale = () => {
  
  const [trades,setTrades]=useState([]);
  const {user,setUser}=useContext(UserContext);

  function  getTradesofUser(){
          
    let newarray=[];

             for(let i=0;i<user.trades.length;i++){

                    axios.get(`https://juniortraders.onrender.com/trade/gettrade/${user.trades[i]}`)
                    .then((res)=>{
                      
                        newarray=[...newarray,res.data.trade];
                        setTrades(newarray)

                    })
                    .catch((e)=>console.log(e))
    }

  }

useEffect(()=>{


    getTradesofUser()
  

},[])

  return (

    <div>
       
       <CreatNewTrade trades={trades} setTrades={setTrades} />
       <MyAccordion trades={trades} setTrades={setTrades}/>

    </div>
  )
}
