

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../css/breackingnews.css'

import Ticker, { FinancialTicker, NewsTicker } from 'nice-react-ticker';

function BreakingNews() {

    const [BreakingNews,setBreakingNews]=useState([]);

    function getLastNews(){

        var url = 'https://cloud.iexapis.com/v1/data/CORE/NEWS?last=10&token=sk_3cad52afb9f44347a29b11bc14838c95'
        axios.get(url)
        .then((response)=> setBreakingNews(response.data))
        .catch((e)=>console.log(e))
    }


    useEffect(()=>{

        getLastNews();

    },[])

  return (

    <div>
 
     
    <div className="newsticker">
      <Ticker  slideSpeed={50}> 

      {BreakingNews.map((news,index)=><NewsTicker id={index}  title={news.headline} url={news.url} />)}
 
      </Ticker>
    </div>
  </div>

  )


}

export default BreakingNews