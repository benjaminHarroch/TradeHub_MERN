
import React from 'react'
import axios from 'axios';
import {useState ,useEffect,useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import UserContext from '../Context/userContext';
import {TimePickers} from './TimePickers'


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

export const CreatNewTrade = () => {

    const [open, setOpen] = React.useState(false);
    const [tradeBuy,settradebuy]=useState();
    const [tradeSell,setTradeSell]=useState();
    const [description,setDescription]=useState();
    const [tikers,setTikers]=useState();
    const [position,setPosition]=useState();
    const [quantity,setQuantity]=useState();


    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const {user,setUser}=useContext(UserContext);


    function handlesubmit(){}


  return (

     <div  className='createNewTradeContainer'>


         <Button onClick={handleOpen}>Login</Button>

         <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
        >

         <Box sx={style}>

         <div className=''>

              <div className=''>
               <label> </label>
               <input type="text" placeholder='' onChange={(e)=>setTikers(e.target.value)}></input>
               </div>
 
               <TimePickers />

               <div className=''>
               <label> </label>
               <input type="text" placeholder='' onChange={(e)=>settradebuy(e.target.value)}></input>
               </div>

               <div className=''>
               <label> </label>
               <input type="text" placeholder='' onChange={(e)=>setTradeSell(e.target.value)}></input>
               </div>

               <div className=''>
               <label> </label>
               <input type="text" placeholder='' onChange={(e)=>setDescription(e.target.value)}></input>
               </div>



               <div className=''>
               <label> </label>
               <input type="text" placeholder='' onChange={(e)=>setPosition(e.target.value)}></input>
               </div>

               <div className=''>
               <label> </label>
               <input type="text" placeholder='' onChange={(e)=>setQuantity(e.target.value)}></input>
               </div>

               <div className=''>
               <button onClick={()=>handlesubmit()}></button>
               
               </div>

      </div>
   
  </Box>
</Modal>

          


     </div>
  )
}
