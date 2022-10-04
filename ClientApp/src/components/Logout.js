import styled from "styled-components";
import React, { useContext } from 'react';
import UserContext from "../Context/userContext";


const LogoutButton=styled.button`

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


const Logout =()=>{

    const {setUser}=useContext(UserContext);

    function logout(){
    
        window.localStorage.removeItem('x-access-token');

        setUser({
              
            user_id:'',
            userName:'',
            profilepic:'',
            posts:[],
            token:'',

        });


    }



    return (

        <div>
        <LogoutButton onClick={()=> logout()}>Logout </LogoutButton>
        </div>
    )

}

export default Logout;