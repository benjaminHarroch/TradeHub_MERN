

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../css/breackingnews.css'

import Ticker, { FinancialTicker, NewsTicker } from 'nice-react-ticker';

function BreakingNews() {

    const [BreakingNews,setBreakingNews]=useState([]);
    function getLastNews(){

        var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=115d6fe212f643f7a5b85170e936bffc';
        axios.get(url)
        .then((response)=> { console.log(response) 
            return (setBreakingNews(response.data.articles))})
        .catch((e)=>console.log(e))
    }


    useEffect(()=>{

        getLastNews();

    },[])

  return (

    <div>
 
     
    <div className="newsticker">
      <Ticker  slideSpeed={50}> 

      {BreakingNews.map((news,index)=><NewsTicker id={index}  title={news.title} url={news.url} />)}
 
      </Ticker>
    </div>
  </div>

  )


}

export default BreakingNews