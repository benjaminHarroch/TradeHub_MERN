
import React from 'react'
import axios from 'axios';
import {useState ,useEffect,useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import UserContext from '../Context/userContext';
import {TimePickers} from './TimePickers'
import '../css/CreatNewTrade.css'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//import { TradeJournale } from './TradeJournale';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const CreatNewTrade = ({trades,setTrades}) => {

    const [open, setOpen] = React.useState(false);
    const [tradeBuy,settradebuy]=useState('');
    const [tradeSell,setTradeSell]=useState('');
    const [description,setDescription]=useState('');
    const [tiker,setTikers]=useState('');
    const [time,setTime]=useState('');
    const [position, setPosition] = React.useState('');
    const [quantity,setQuantity]=useState('');
    const [errorMessage,setErrorMessage]=useState("");

    const [newtmptrade,setNewTrade]=useState({});


    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const {user,setUser}=useContext(UserContext);


    function getNewTrade(){

      let newarray;
      let gain=0;
      let lose=0;
      let dollars;

      let newTrade={

        tiker,
        description,
        position,
        quantity,
        date:time,
        buy:tradeBuy,
        sell:tradeSell

      };

     if(position==='short'){

       if(tradeBuy>tradeSell){
            
        gain=tradeBuy-tradeSell;
        dollars=gain;
        gain=gain/tradeBuy;
        gain=gain*100;

      }else{
        lose=tradeSell-tradeBuy;
        dollars=lose;
        lose=lose/tradeBuy;
        lose=lose*100;
      }

     }else if(position==='long'){

      if(tradeBuy<tradeSell){
        gain=tradeSell-tradeBuy;
        dollars=gain;
        gain=gain/tradeBuy;
        gain=gain*100;
      }else{
        lose=tradeBuy-tradeSell;
        dollars=lose;
        lose=lose/tradeBuy;
        lose=lose*100;
      }
     }
       

     if(gain){

      newTrade.success=true;
      newTrade.gain=gain;
      newTrade.dollars=dollars;

     }else{
      
      newTrade.success=false;
      newTrade.gain=lose;
      newTrade.dollars=dollars;

     }
 
     
        console.log(newTrade)
        handleClose()
        setDescription("");
        setNewTrade("");
        setTikers("");
        settradebuy("");
        setTradeSell("");
        setDescription("");
        setTime("");
        setPosition("");
        setQuantity("");


        axios.post('http://localhost:8000/trade/newTrade',newTrade)
        .then((res)=>{

          console.log(res.data)

          axios.post(`http://localhost:8000/trade/newTrade/${user.user_id}`,{tradeid:res.data.newtrade})
          .then((res)=>console.log(res))
          .catch((e)=>console.log('second',e))


        })
        .catch((e)=>console.log('first' ,e));

        newarray=[...trades,newTrade];
        setTrades(newarray)

      

    }


    function handlesubmit(){

      let error=false;
      setErrorMessage("");

      if(tradeBuy.length<1||tradeSell.length<1||description.length<1||position.length<1||quantity.length<1||time.length<1){

       error=true;
       setErrorMessage("one of the field is empty")
    
      }
      if(quantity<1||isNaN(quantity)){

        error=true;
        setErrorMessage((prev)=>prev+"the quantity must be a number and over one")
      }
      if(tradeSell<=0||isNaN(tradeSell)){
        
        error=true;
        setErrorMessage((prev)=>prev+"the price must be a number and over zero")

      }

      if(tradeBuy<=0||isNaN(tradeBuy)){
        
        error=true;
        setErrorMessage((prev)=>prev+"the price must be a number and over zero ")

      }

      if(!error){

      setNewTrade({

          tradeBuy,
          tradeSell,
          description,
          tiker,
          position,
          quantity,
          time

     })

     getNewTrade();

    }else{

      console.log('error',errorMessage)
    }


  }

    useEffect(()=>{
    console.log(newtmptrade,errorMessage,user)

    },[newtmptrade,errorMessage,user])


  return (

     <div  className='createNewTradeContainer'style={{display:"flex", justifyContent:"center",margin:"2em 0"}}>


         <Button onClick={handleOpen}  >Add New Trade</Button>

         <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
        >

         <Box sx={style}>

         <div className='containerNewTrade'>

              <div className='tikers'>
               <label>Tikers : </label>
               <input type="text" placeholder=' name of stock' onChange={(e)=>setTikers(e.target.value)}></input>
               </div>
 
               <TimePickers setTime={setTime}/>

               <div className='buy'>
               <label>price avg buy : </label>
               <input type="text" placeholder=' avg price buy' onChange={(e)=>settradebuy(e.target.value)}></input>
               </div>

               <div className='sell'>
               <label> price avg sale:</label>
               <input type="text" placeholder='avg price sell' onChange={(e)=>setTradeSell(e.target.value)}></input>
               </div>

               <div className='description'>
               <label> why take this trade ? </label>
               <input type="text" placeholder=' some raison to trade .' onChange={(e)=>setDescription(e.target.value)}></input>
               </div>



               <div className='position'>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small">position</InputLabel>
                        <Select
                           labelId="demo-select-small"
                            id="demo-select-small"
                           value={position}
                           label="position"
                          onChange={(e)=> setPosition(e.target.value)}
                        >
                       <MenuItem value={"short"}>short</MenuItem>
                       <MenuItem value={"long"}>long</MenuItem>
        
                      </Select>
                    </FormControl>
               </div>

               <div className='quantity'>
               <label>quantity : </label>
               <input type="text" placeholder=' how munch stock?' onChange={(e)=>setQuantity(e.target.value)}></input>
               </div>

               <div className='button-submit'>
               <button type='type' onClick={()=>handlesubmit()}>New Trade</button>
               </div>

               <div className='button-submit' style={{padding:"1em",color:"red",fontWeigth:"600" ,fontFamily:"Emojy"}}>{errorMessage}</div>

      </div>
   
  </Box>
</Modal>

          


     </div>
  )
}
