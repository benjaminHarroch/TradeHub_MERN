


import { priceData } from "../Utils/priceData";
//import { areaData } from './areaData';
import { volumeData } from "../Utils/VolumData";
import axios from 'axios'
import React, { useEffect,useState } from 'react'
import CandleStickStockScaleChart from './CandleStickStockScaleChart'

export const DayStock = () => {


const[price,setPrice]=useState([]);

const arraoyOfTIker=['AAPL','AMZN'];


async function getPriceDataFromDB (arrayoftiker){

    let priceData=[];


     for(let i=0;i<arrayoftiker.length;i++){
    
      //console.log(posts[i])
      const res=await axios.get(`http://localhost:8000/getpricedata/${arrayoftiker[i]}`)
      const data=await res.data;
      //console.log(data)
      priceData=[data,...priceData]
      console.log(priceData)
     }
     console.log('out')
     setPrice(priceData);
    

}


useEffect(()=>{

    console.log('real',priceData)

 getPriceDataFromDB(arraoyOfTIker);
 //console.log(price)

},[])

useEffect(()=>{
    let i=0;

    (price.length===arraoyOfTIker.length&&console.log('end',price))
    console.log(i++);
},[price])




  return (


    <div>


    
    {
        
            <CandleStickStockScaleChart priceData={item} volumeData={volumeData}/>


    
    }

    </div>


  )
}
