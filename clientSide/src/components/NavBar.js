import React, { useContext, useState } from 'react'
import "./css/NavBar.css"
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import UserContext from './context/userContext';
import NestedList from './NestedList';  
import SearchBar from './SearchBar';


function NavBar({color}) {

  const Navigate=useNavigate();
  const {user}=useContext(UserContext);
  const [showListMenu,SetshowListMenu]=useState(false);

 


  return (

    <div className='NavBar-container'  onMouseLeave={() => SetshowListMenu(false)}>

            <div className={'NavBar-LeftSide'} style={{ backgroundColor: color }}>

             <Avatar   onMouseEnter={() => SetshowListMenu(true)}
                       onClick={()=> Navigate(`/Profile/${user.user_id}`)}
                       sx={{ cursor:'pointer' }} 
                       alt="User Profile"
                       src={user.profilepic}>B</Avatar>
             <div onMouseEnter={() => SetshowListMenu(true)} style={showListMenu?{position: 'absolute' ,top: '38px',left: '70px'}:{display:'none'}}><NestedList /></div>
             <i className="fas fa-envelope"></i> {/* Message icon */}
             <i className="fas fa-bell"></i> {/* Notification icon */}

            </div>

             <div className={'NavBar-MidleSide'} style={{ backgroundColor: color }}>
             <i onClick={()=>Navigate(`/HomePage`)} className="fas fa-home"></i> {/* Home icon */}
             <i onClick={()=>Navigate(`/journalTrader/${user.user_id}`)}className="fas fa-chart-bar"></i> {/* Chart icon */}
             <i onClick={()=>Navigate(`/stockNews`)} className="fa fa-newspaper"></i> {/* Add more icon */}

           

            </div>
            <div className={'NavBar-RightSide'} style={{ backgroundColor: color }}>
             <SearchBar />
              <img src='https://firebasestorage.googleapis.com/v0/b/tradehub-ec4d8.appspot.com/o/profile_pics%2FBEARISH%20PIN%20BAR.png?alt=media&token=e5b096e0-28d2-4cd7-8b86-a80e69ef27f1' alt='logo' /> {/* Logo */}

            </div>

    </div>
  )
}

export default NavBar