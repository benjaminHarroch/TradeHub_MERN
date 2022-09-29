import styled from "styled-components";
import React from 'react';


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



    return (

        <div>
        <LogoutButton onClick={()=> window.localStorage.removeItem('x-access-token')}>Logout </LogoutButton>
        </div>
    )

}

export default Logout;