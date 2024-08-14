import React, { useContext, useEffect, useState } from 'react'
import "./css/NavBar.css"
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import UserContext from './context/userContext';
import NestedList from './NestedList';

function NavBar({color}) {

  const Navigate=useNavigate();
  const {user}=useContext(UserContext);
  const [showListMenu,SetshowListMenu]=useState(false);
  const [isHovered, setIsHovered] = useState(false);
  

 


  return (

    <div className='NavBar-container'  onMouseLeave={() => SetshowListMenu(false)}>

            <div className={'NavBar-LeftSide'} style={{ backgroundColor: color }}>

             <Avatar   onMouseEnter={() => SetshowListMenu(true)}
                       onClick={()=> Navigate(`/Profile/${user.user_id}`)}
                       sx={{ bgcolor: deepOrange[500] ,cursor:'pointer' }} >B</Avatar>
             <div onMouseEnter={() => SetshowListMenu(true)} style={showListMenu?{position: 'absolute' ,top: '38px',left: '70px'}:{display:'none'}}><NestedList /></div>
             <i className="fas fa-envelope"></i> {/* Message icon */}
             <i className="fas fa-bell"></i> {/* Notification icon */}

            </div>

             <div className={'NavBar-MidleSide'} style={{ backgroundColor: color }}>
             <i onClick={()=>Navigate(`/HomePage`)} className="fas fa-home"></i> {/* Home icon */}
             <i className="fas fa-chart-bar"></i> {/* Chart icon */}
             <i className="fas fa-plus-circle"></i> {/* Add more icon */}

           

            </div>
            <div className={'NavBar-RightSide'} style={{ backgroundColor: color }}>
             <i className="fas fa-search"></i> {/* Search icon */}
              TRADEHUB {/* Logo */}

            </div>

    </div>
  )
}

export default NavBar