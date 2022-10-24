


//import { priceData } from "../Utils/priceData";
//import { areaData } from './areaData';
import { volumeData } from "../Utils/VolumData";
import axios from 'axios'
import React, { useEffect,useState } from 'react'
import CandleStickStockScaleChart from './CandleStickStockScaleChart'
import { Loading } from "./Loading";
import '../css/allchart.css'

export const DayStock = ({arrayStock}) => {


const[price,setPrice]=useState([]);

const arraoyOfTIker=arrayStock;
console.log(arraoyOfTIker);


async function getPriceDataFromDB (arrayoftiker){

    let priceData=[];


     for(let i=0;i<arrayoftiker.length;i++){
    
      //console.log(posts[i])
      const res=await axios.get(`http://localhost:8000/getpricedata/${arrayoftiker[i]}`)
      const data=await res.data;
      //console.log('sda',data)
      priceData=[data,...priceData]
      //console.log('array after add change',priceData)
     }
     //console.log('after get data from api')
     setPrice(priceData);
    

}


useEffect(()=>{

   // console.log('real',priceData)

 getPriceDataFromDB(arraoyOfTIker);
 //console.log(price)

},[])

useEffect(()=>{
   

    (price.length===arraoyOfTIker.length&&console.log('end',price))
    console.log('price change');
},[price])




  return (


    <div className="Container">

     <h1>Momentum Stock's For Tdoay</h1>
    
      <div className="containreallchart">
    {
    price.length===arraoyOfTIker.length?price.map((item,index)=>{ return (<CandleStickStockScaleChart priceData={item.reverse()} volumeData={volumeData} stockName={arraoyOfTIker[(arraoyOfTIker.length-1)-index]}/>)}):<div className="loading"><Loading type={'balls'} color={'#lightblue'} height={'5em'} width={'5em'} /></div>
    
    }
     </div>

    </div>


  )
}
