

import React from 'react'
import { useContext ,useState } from 'react'
import { useNavigate } from 'react-router';

import Drawer from "@mui/material/Drawer";
import IconButton from '@mui/material/IconButton';
import DehazeIcon from '@mui/icons-material/Dehaze';


import{ Login } from './Login'
import { Register } from './Register';

import '../css/hamburgerMenu.css'
import Logout from './Logout';
import UserContext from '../Context/userContext';



function HamburgerMenu (){

    const [stateDrawer, setStateDrawer] = useState(false);
    const navigate =useNavigate();
    const {user}=useContext(UserContext);


    return (

        <div>

             <IconButton color="primary"  font-size="large" onClick={()=>setStateDrawer(true)} >
                <DehazeIcon style={{ fontSize: 50 }} />
             </IconButton>

           <Drawer
            anchor='left'
            open={stateDrawer}
            onClose={()=>setStateDrawer(false)}
           
            >
            
          
            <div ><button className='barButton' onClick={()=>{navigate('/News')}}> News</button></div>
            <div ><button className='barButton' onClick={()=>{navigate('/')}}> Home </button></div>
            <div ><button className='barButton'onClick={()=>{navigate('/daystock')}}> Day Stocks </button></div>
            <div ><button className='barButton'onClick={()=>{navigate('/Mytrade')}}> Trade Journale </button></div>
           {user.token?<div ><button className='barButton'><Logout /></button></div>:<div><div><button className='barButton'><Login /></button></div><div><button className='barButton'><Register /></button></div></div>}
            
            </Drawer>

        </div>

    )

}


export default HamburgerMenu;