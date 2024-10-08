
import axios from 'axios';
import {useState ,useEffect} from 'react';
import './css/WatchList.css'

import Drawer from "@mui/material/Drawer";
//import IconButton from '@mui/material/IconButton';





function WatchList() {

    const [stateDrawer, setStateDrawer] = useState(false);

    const [watchList,setWatchList]=useState([]);
    const [ticker,setTicker]=useState('');
    const [error,setError]=useState({
        message:'',
        found:false
    });
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getDataForTicker();
        }
      };

    //const {user,setUser}=useContext(UserContext);

    function getDataForTicker(){

        const token="am9yS0JoVnp1amtRVjhQSkR5UFI2M0ZQUzU4cVdBal81TlVaZUY3QnhxZz0";
    
        const found = watchList.find(element => element.name ===ticker);

       if(found){
        setError(error.found=true,error.message="the tiker is already exist")
        return
       }
        
        let url=`https://api.marketdata.app/v1/stocks/quotes/${ticker}?token=${token}`;

         axios.get(url)
         .then((res)=>{
          console.log(res)
            let newStock={
                name:ticker,
                price:res.data.last[0],
                change:res?.data.change[0],
                changePercent:res?.data.changepct[0]
               }

               let newwacthlist=[...watchList,newStock]
               setWatchList(newwacthlist)
               window.localStorage.setItem('watchList',JSON.stringify(newwacthlist));
    
               return
            
          })
            .catch((e)=>console.log('error',e))

    }


    useEffect(() => {

      const wathListFromLocalStorage=JSON.parse(window.localStorage.getItem('watchList'))
      wathListFromLocalStorage?setWatchList(wathListFromLocalStorage):setWatchList([]);
     
    },[])
    


  return (

    <div className='containerWatchList'>

       <button onClick={()=>setStateDrawer(true)}>wacthList</button>

        <Drawer
            anchor='right'
            open={stateDrawer}
            onClose={()=>setStateDrawer(false)}
           
          >
            <div className='WatchList' onKeyDown={handleKeyPress}>

                        <div className='formTicker'>
                                <input type="text" placeholder='enter ticker' onChange={(e)=>setTicker(e.target.value)} value={ticker}></input>
                                <button onClick={()=>getDataForTicker()}>+</button>
                        </div>
                        <div className='wacthListminicontainer'>
                                    <div className='heading'><p>ticker</p> <p>close</p> <p>change%</p> <p>change</p> </div>
                                {
                                    watchList?.map((stock)=>{

                                    return(
                                        <div className='heading'><p>{stock.name}</p> <p style={stock.changePercent<0?{color:"red"}:{color:"green"}}>{stock.price}</p> <p style={stock.changePercent<0?{color:"red"}:{color:"green"}}>{stock.changePercent+'%'}</p> <p style={stock.changePercent<0?{color:"red"}:{color:"green"}}>{stock.change}</p> </div>
                                    )
                                    })
                                }


                        </div>
            </div>

       </Drawer>

    </div>
  )
}

export default WatchList