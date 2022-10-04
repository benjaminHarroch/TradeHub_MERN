
import React, { useState } from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import { Loading } from './Loading';
import '../css/news.css';


export const News = () => {

    const [news,setNews]=useState([]);
    const [tiker,settiker]=useState('');
    const [tempNews,settempNews]=useState([]);

    function sortNewsDashboard(){

      //console.log('it s work')
      

     if(tiker===''){
      //console.log('its')
      setNews(tempNews);
     }else{
      console.log('fds',tempNews)
      const sortingNews=tempNews.filter((item)=>item.headline.includes(tiker));
    
      console.log(sortingNews);
      setNews(sortingNews);
     }


    }


    async function getNews(){

        
            try {
              const response = await axios.get('http://localhost:8000/news');
              //console.log(response.data.data);
              setNews(response.data.data);
              settempNews(response.data.data);
             //console.log('f',tempNews)
            } catch (error) {
              console.error(error);
            }

    }
   
    function getTimeConvert(UNIX_timestamp){


        var a = new Date(UNIX_timestamp * 1000);
        var year = a.getFullYear();
        var month = a.getMonth()+1;
        if(month>0&&month<10){
          month='0'+month;
        }
        var date = a.getDate();
        if(date>0&&date<10){
          date='0'+date;
        }
        
        var time = year + '-' + month + '-' + date ;
        return time;
      
      }
      


    useEffect(()=>{


        getNews();



    },[]);

    useEffect(()=>{

     
     sortNewsDashboard()
    


  },[tiker]);




  return (


<div className='containerofcontener'>  
  
    <div className='searchBarForNews'> <input type='text' placeholder='Search for a stock is  last news' onChange={(e)=>settiker(e.target.value)} value={tiker}></input></div>

    <div className='newsContainer'>

        {

         

            news.length>0?news.map((item)=>{

                 const time= getTimeConvert(item.datetime);
                 

               return(
                
                <a href={item.url} className='linkContainer' target="_blank">
                  <div className='newsCart'>

                    <div className='summary'> {item.summary.length>100?item.summary.slice(0,100)+'...':item.summary}</div>
                    <div className='headline'> {item.headline}</div>
                    <div className='datetime'> {time}</div>
                    <div className='image'> <img src={item.image} alt='image news'></img></div>
                    

                  </div>
                </a>
               )

            }):<div className='loadingDiv'><Loading type={'balls'} color={'#lightblue'} height={'5em'} width={'5em'} /></div>


        }



    </div>

  </div>

  )
}
