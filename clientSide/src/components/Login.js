import React, { useState } from 'react'
import "./css/Login.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {

    const [userName,setUserName]=useState('');
    const [userPassword,setuserPassword]=useState('');
    const [error,setError]=useState({
        existError:false,
        errorMessage:""
    });
    const navigate=useNavigate();

    function chekeIfValideLogin(password,userName){

        if(password.length<8 ||(userName.length<1||userName.length>30)){

            setError({
                existError:true,
                errorMessage:"the user name or password is incorrect"
            });

        }
  
        if(password.length===0 ||userName.length===0){

            setError({
                existError:true,
                errorMessage:"please fille all inputes"
            });

        }
      }

    async function GetUserFromDataBase(){
      

        chekeIfValideLogin(userPassword,userName);
        console.log(error.errorMessage);

        if(error.existError===false){

        const jsonObject=JSON.stringify({userName:userName,password:userPassword})
        console.log(jsonObject);
        
            axios.post('http://localhost:8000/auth/login',{
                "userName":userName,
                "password":userPassword
            }).then(
                response => {
                    console.log(response);
                    navigate('/HomePage');
                }
            ).catch(error =>{
                console.log("error -->" ,error.response.data);
                /*setError({
                    existError:true,
                    errorMessage:`error - ${error.response.data.message}`
                });*/
            })


      
    }

    }

  return (
    <div className='container-login-page'>

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
                <div className='error-text'>{error.errorMessage}</div>
                <div className='forgot-btn'><button>forgot-password?</button></div>
                

                <div className='Sign-up'>
                    <div className='Sign-up-text'>Don't have an account? </div>
                    <button className='Sign-up-button'>Sign up</button>
                </div>

            </div>

        </div>

    </div>
  )
}
