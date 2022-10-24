


import axios from 'axios';
import React, {useEffect,useState } from 'react'
import '../css/watchlist.css'





function WatchList() {

    const [watchList,setWatchList]=useState([]);
    const [ticker,setTicker]=useState('');
    const [error,setError]=useState({
        message:'',
        found:false
    });



    function getDataForTicker(){
    
        let objstock;
        let newwacthlist=[];

        const found = watchList.find(element => element.name ===ticker);

       if(found){
        setError(error.found=true)
        return
       }
        
        let url=`https://cloud.iexapis.com/v1/data/CORE/QUOTE/${ticker}?token=sk_3cad52afb9f44347a29b11bc14838c95`;

         axios.get(url)
         .then((res)=>{

            console.log(res.data[0])
            objstock={
                name:ticker,
                price:res.data[0].latestPrice,
                change:res.data[0].change,
                changePercent:res.data[0].changePercent

               }
               newwacthlist=[...watchList,objstock]
               setWatchList(newwacthlist)

           return

           // setstockobj(res.data[0])


            
        })
         .catch((e)=>console.log(e))


    }


    useEffect(() => {

        //getWatchListFromDb();

     
    },[])
    


  return (

    <div className='containerWatchList'>

       <div className='formTicker'>
       <input type="text" placeholder='enter ticker' onChange={(e)=>setTicker(e.target.value)} value={ticker}></input>
       <button onClick={()=>getDataForTicker()}>+</button>
       </div>
       <div className='wacthListminicontainer'>
        <div className='heading'><p>ticker</p> <p>close</p> <p>change%</p> <p>change</p> </div>
       {
        watchList?.map((stock)=>{

        return(
            <div className='heading'><p>{stock.name}</p> <p style={stock.changePercent<0?{color:"red"}:{color:"green"}}>{stock.price}</p> <p style={stock.changePercent<0?{color:"red"}:{color:"green"}}>{stock.changePercent.toFixed(2)}</p> <p style={stock.changePercent<0?{color:"red"}:{color:"green"}}>{stock.change}</p> </div>
        )
        })
       }


       </div>



    </div>
  )
}

export default WatchList