

import React from 'react'
import { useContext ,useState } from 'react'
import { useNavigate } from 'react-router';

import Drawer from "@mui/material/Drawer";
import IconButton from '@mui/material/IconButton';
import DehazeIcon from '@mui/icons-material/Dehaze';

import '../css/hamburgerMenu.css'



function HamburgerMenu (){

    const [stateDrawer, setStateDrawer] = useState(false);
    const navigate =useNavigate();
  


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
            
            <div ><button className='barButton'>posts</button></div>
            <div ><button className='barButton'>momentum stock</button></div>
            <div ><button className='barButton'>News</button></div>
            <div ><button className='barButton'>login</button></div>
            <div ><button className='barButton'>Register</button></div>
            
            </Drawer>

        </div>

    )

}


export default HamburgerMenu;