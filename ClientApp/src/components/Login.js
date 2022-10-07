import React from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import {useState ,useEffect,useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import UserContext from '../Context/userContext';
import '../css/login.css'

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

export const Login = () => {

    const [open, setOpen] = React.useState(false);
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [error,seterror]=useState({
      flage:false,
      errorMessage:''
    });

    const {user,setUser}=useContext(UserContext);

   let errorFlage=false;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(()=>{


    },[password,userName])

    function chekeIfValideLogin(password,userName){

      if(password.length<8 ||(userName.length<1||userName.length>30)){
        seterror({
          flage:true,
          errorMessage:"the user name or password is incorrect"
        });
        errorFlage=true;
      }

      if(password.length===0 ||userName.length===0){
        seterror({
          flage:true,
          errorMessage:"please fill all inputs"
        });
        errorFlage=true;
      }

        

    }

    function handlesubmit(){

      chekeIfValideLogin(password,userName);

      if(errorFlage){
       
       return; 

      }else{

        axios.post(`http://localhost:8000/auth/login`, {userName,password})
        .then(res => {
          console.log('res',res);
          console.log(res.data.user);
          
          window.localStorage.setItem("x-access-token",res.data.token);
          setUser({
              
            user_id:res.data.user._id,
            userName:res.data.user.userName,
            profilepic:res.data.user.profilepic,
            posts:res.data.user.posts,
            token:res.data.token,

          })

        }).catch(err=>{console.log(err.response.data.message)
           seterror({flage:true,errorMessage:err.response.data.message})
          })

      }


    }


  return (

    <div>

    <Button onClick={handleOpen}>Login</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>

            <div className='LoginContainer'>

                     <div className='username-login'> 
                     <label>User-Name: </label>
                     <input type='text' placeholder='please enter your user name' onChange={(e)=>setUserName(e.target.value)}></input>
                     </div>

                     <div className='password-login'>
                     <label>Password: </label>
                     <input type="text" placeholder='please enter your password' onChange={(e)=>setPassword(e.target.value)}></input>
                     </div>

                     <div className='button-login'>
                     <button onClick={()=>handlesubmit()}>log in</button>
                     <ErrorMessage>{error.errorMessage}</ErrorMessage>
                     </div>

                     <ForgetPassWord>forget password? </ForgetPassWord>
            </div>
         
        </Box>
      </Modal>
        
    </div>
  )
}
