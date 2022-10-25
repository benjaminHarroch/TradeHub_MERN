


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
//console.log(arrayStock);
const [storedArray,setstoredArray]=useState([]);


async function getPriceDataFromDB (arrayoftiker){

    let priceData=[];


     for(let i=0;i<arrayoftiker.length;i++){
    
      //console.log(posts[i])
      const res=await axios.get(`https://juniortraders.onrender.com/getpricedata/${arrayoftiker[i]}`)
      const data=await res.data;
      //console.log('sda',data)
      priceData=[data,...priceData]
      //console.log('array after add change',priceData)
     }
     //console.log('after get data from api')
     setPrice(priceData);
    

}


useEffect(()=>{

  console.log('stored array1',storedArray)

  let storedarrayfromlocalstorage=localStorage.getItem("array-data");
  if(storedarrayfromlocalstorage!=null){
  storedarrayfromlocalstorage=JSON.parse(storedarrayfromlocalstorage)
  }else{
    storedarrayfromlocalstorage=[];
  }

  console.log('storedfrom local',storedarrayfromlocalstorage)

  storedarrayfromlocalstorage&&setstoredArray(storedarrayfromlocalstorage)

  console.log('stored array2',storedArray)

   if(storedarrayfromlocalstorage.length!=0){
    console.log('first')
    setPrice(storedarrayfromlocalstorage)
   
   }else{
    console.log('second')
    getPriceDataFromDB(arraoyOfTIker);
    console.log('real',price)

   }

 

},[])

useEffect(()=>{
   
     //let storedArray = JSON.parse(localStorage.getItem("array-data"));
     //console.log('5',price)
     if(price.length!=0){                                                                                                                                                                                                                                                                                                                                                              

      (price.length===arraoyOfTIker.length&&localStorage.setItem("array-data", JSON.stringify(price)))
       setstoredArray(JSON.parse(localStorage.getItem("array-data")))
      //console.log('price change');
      //console.log('storage',storedArray)
     }
     
},[price])


useEffect(()=>{
 // console.log('sts;,;',storedArray);
},[storedArray])


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
