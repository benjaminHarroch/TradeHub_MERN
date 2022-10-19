import React from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import {useState ,useEffect,useContext  } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import '../css/register.css'
import UserContext from '../Context/userContext';


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

const ForgetPassWord = styled.div`
  font-size: 0.8em;
  position:absolute;
  bottom:5px;
  right:8px;
  color: lightblue;
  letter-spacing:2px;
  &:hover {
    opacity:0.8;
    cursor:pointer;
  }
`;

const ErrorMessage = styled.div`
  font-size: 0.8em;
  color: red;
  letter-spacing:2px;
  margin-top:8px;
  
`;

export const Register = () => {

    const [open, setOpen] = React.useState(false);
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [passwordValidation,setPasswordValidation]=useState('');
    const [error,seterror]=useState({
      flage:false,
      errorMessage:''
    });

    let errorFlage=false;
    

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {user,setUser}=useContext(UserContext);


    function chekeIfValideRegister(){

      let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
     error.errorMessage='';
      
      if(!(password===passwordValidation)){
        seterror({
          flage:true,
          errorMessage:" the password validation not correspond to the password ."
        })
        errorFlage=true;
      }

      if((userName.length<1)){
        seterror((prev)=> 
        {
          return (
          {
          flage:true,
          errorMessage:prev.errorMessage + " the username is to short please insert min of 8 caracters ."
          })
        })
        errorFlage=true;
      }

      if((password.length<8)){
        seterror((prev)=> 
        {
          return (
          {
          flage:true,
          errorMessage:prev.errorMessage + " the password is to short please insert min of 8 caracters . "
          })
        })
        errorFlage=true;
      }

      if(!(format.test(password))){
        seterror((prev)=> 
        {
          return (
          {
          flage:true,
          errorMessage:prev.errorMessage + " password weak need special caracter ."
          })
        })
        errorFlage=true;
      }
      


    }

    function handlesubmit(){

      chekeIfValideRegister();

      if(errorFlage){
       
       return; 

      }else{

        axios.post(`http://localhost:8000/auth/register`, {userName,password})
        .then(res => {
          console.log('res',res);
          console.log(res.data.message);

          setUser({
              
            user_id:res.data.newUser._id,
            userName:res.data.newUser.userName,
            profilepic:res.data.newUser.profilepic,
            posts:res.data.newUser.posts,
            token:res.data.token,

          })
        }).catch(err=>{console.log(err.response.data.message)
           seterror({flage:true,errorMessage:err.response.data.message})
          })



      }


    }


  return (

    <div>

    <Button onClick={handleOpen}>Register</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>

            <div className='RegisterContainer'>

                     <div className='username-register'> 
                     <label>User-Name: </label>
                     <input type='text' placeholder='please enter your user name' onChange={(e)=>setUserName(e.target.value)}></input>
                     </div>

                     <div className='password-register'>
                     <label>password: </label>
                     <input type="text" placeholder='please enter your password' onChange={(e)=>setPassword(e.target.value)}></input>
                     </div>

                     
                     <div className='password-register'>
                     <label>password validation: </label>
                     <input type="text" placeholder='please enter your password' onChange={(e)=>setPasswordValidation(e.target.value)}></input>
                     </div>

                     <div className='button-register'>
                     <button onClick={()=>handlesubmit()}>Register </button>
                     <ErrorMessage>{error.errorMessage}</ErrorMessage>
                     </div>

                     <ForgetPassWord>already have acoount? </ForgetPassWord>
            </div>
         
        </Box>
      </Modal>
        
    </div>
  )
}
