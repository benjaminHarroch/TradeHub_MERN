import React, { useContext, useState } from 'react'
import "./css/Login.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from './context/userContext';
import MySnackbar from './MySnackbar';

export const Login = () => {

    const [userName,setUserName]=useState('');
    const [userPassword,setuserPassword]=useState('');
    const [error,setError]=useState({
        existError:false,
        errorMessage:""
    });
    const {user,setUser}=useContext(UserContext);
    const navigate=useNavigate();
    let boolianEror=false;

    function chekeIfValideLogin(password,userName){

        if(password.length<8 ||(userName.length<1||userName.length>30)){

            boolianEror=true;
            setError({
                existError:true,
                errorMessage:"the user name or password is incorrect"
            });

        }
  
        if(password.length===0 ||userName.length===0){

            boolianEror=true;
            setError({
                existError:true,
                errorMessage:"please fille all inputes"
            });

        }
      }

    async function GetUserFromDataBase(){
      

        chekeIfValideLogin(userPassword,userName);
        console.log(error.errorMessage);

        if(!boolianEror){

        const jsonObject=JSON.stringify({userName:userName,password:userPassword})
        console.log(jsonObject);
        
            axios.post('https://tradehub-mern.onrender.com/auth/login',{
                "userName":userName,
                "password":userPassword
            }).then(
                res => {
                    window.localStorage.setItem("access-token",res.data.token);
                    window.localStorage.setItem("user-detaille",JSON.stringify(res.data.user));

                    setUser({
                        
                      user_id:res.data.user._id,
                      userName:res.data.user.userName,
                      profilepic:res.data.user.profilepic,
                      posts:res.data.user.posts,
                      token:res.data.token,
                      trades:res.data.user.trades
                    })
                    navigate('/HomePage');
                }
            ).catch(error =>{
                console.log("error -->" ,error.response);
                setError({
                    existError:true,
                    errorMessage:`error - ${error.response.data.message}`
                });
            })
        }else{


    }

    }

  return (
    <div className='container-login-page'>
      
      <MySnackbar />
        <div className='login-animation'>

            <img src="https://th.bing.com/th/id/OIP.TKaUFxDz8t2louvtN75DTgHaE7?rs=1&pid=ImgDetMain" alt="login page"/>

        </div>

        <div className='login-form-container'>
            
            <div className='login-form'>

                <image>LOGO</image>
                <div className='login-form-input'>
                <input type='text' placeholder='username or email' onChange={(e)=>setUserName(e.target.value)}></input>
                </div>
                <div className='login-form-input'>
                <input type='text' placeholder='Password' onChange={(e)=>setuserPassword(e.target.value)}></input>
                </div>

                <div className='Login-btn' onClick={()=>GetUserFromDataBase()}><button>Log-in</button></div>
                <div className='error-text' style={{color:'red',fontWeight:'800'}}>{error.existError&&error.errorMessage+' please try again'}</div>
                <div className='forgot-btn'><button>forgot-password?</button></div>
                

                <div className='Sign-up'>
                    <div className='Sign-up-text'>Don't have an account? </div>
                    <button onClick={()=>navigate('/Register')}className='Sign-up-button'>Sign up</button>
                </div>

            </div>

        </div>

    </div>
  )
}
