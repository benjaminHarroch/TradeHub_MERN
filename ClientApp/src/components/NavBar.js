
import React from 'react'
import { useContext ,useState } from 'react'
import { useNavigate } from 'react-router';
import UserContext from '../Context/userContext';
import '../css/navbar.css'
import { Register } from './Register';
import { Login } from './Login';
import Logout from './Logout';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import HamburgerMenu from './HamburgerMenu';



const ButtonNavigate=styled.button`

padding:5px;
background-color:inherit;
border:none;
color: #1976d2;
font-weight: 600;
font-size: 0.875rem;
line-height: 1.75;
letter-spacing: 0.02857em;
text-transform: uppercase;
min-width: 64px;
padding: 6px 8px;
border-radius: 4px;
&:hover {
    opacity:0.8;
    cursor:pointer;
  }

`

const Title=styled.div`
font-size: 1.5em;
font-weight: 700;
letter-spacing: 3px;
padding:7px;

`


const NavBar =()=>{


const {user}=useContext(UserContext);

const navigate=useNavigate();
    


    return (


             <div className='NavBarContainer'>
               
               <Title className='logo'>
                JuniorTraders
               </Title>

               <div className='links'>

               <ButtonNavigate onClick={()=>{navigate('/News')}}> News </ButtonNavigate>
               <ButtonNavigate onClick={()=>{navigate('/')}}> Home </ButtonNavigate>
               <ButtonNavigate onClick={()=>{navigate('/')}}> Day Stocks </ButtonNavigate>
               
               
               </div>

               <div className='SearchBar'>

                  <Box
                     sx={{
                     width: 400,
                     maxWidth: '100%',
                    }}
                  >
                 <TextField fullWidth label="search-user" id="fullWidth"  />
                 </Box>
                
               </div>
               
               <div className='authButtons'>
                {user.token?<div className='authButtons-login'><Logout /> <Avatar
                                                    alt="Remy Sharp"
                                                    src="/static/images/avatar/1.jpg"
                                                    sx={{ width: 56, height: 56 }}
                 /></div>:
                <div className='authButtons-login' ><Register/> <Login/></div>}
                <Avatar alt="Profile Pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvi-tJNqAm1Q2FS1SXHQDmC98jn0ylHzeP9FC68REFbQ&s" />
               </div>
   
               <div className='hamburgerMenu'> 

                <HamburgerMenu />

               </div>


             </div>
    )
}


export default NavBar;