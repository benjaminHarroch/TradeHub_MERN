import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';

const Register = () => {
    const [userName, setUserName] = useState();
    const [profilepic, setProfilePic] = useState();
    const [password, setPassword] = useState();
    const [secondPassword,setSecondPassword]=useState();
    const[error,setError]=useState(false);
    const[message,setMessage]=useState('');
    const navigate = useNavigate();

    const {user,setUser}=useContext(UserContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        if(password!=secondPassword){
          setError(true);
          setMessage("checke your password - not same password")
        }
        else
        {
        
        axios.post( 'http://localhost:8000/auth/register', {userName, password ,profilepic})
        .then(res => {
                console.log('res',res);
                //console.log("response from db",res);
                    //save the token of the user after success to authenticat
                    window.localStorage.setItem("access-token",res.data.newUser.token);
                    setUser({
                        
                      user_id:res.data.newUser.id,
                      userName:res.data.newUser.userName,
                      profilepic:res.data.newUser.profilepic,
                      posts:res.data.newUser.posts,
                      token:res.data.newUser.token,
                      trades:res.data.newUser.trades
                    })
                alert("Registered successfully! Please Login to proceed.")
                navigate('/HomePage');
            })
        .catch(err =>{
          console.log('error',err)
          if(err.response.data.message == "the user is already exist"){
            alert("userName already registered! Please Login to proceed.");
            navigate('/');
          }
      })
    }
    }


    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}}>
                <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                    <h2 className='mb-3 text-primary'>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong >UserName</strong>
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter a user Name"
                                className="form-control" 
                                id="exampleInputname" 
                                onChange={(event) => setUserName(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Profile pic</strong>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Enter an url"
                                className="form-control" 
                                id="exampleInputEmail1" 
                                onChange={(event) => setProfilePic(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password  validation</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter the Password again"
                                className="form-control" 
                                id="exampleInputPassword2" 
                                onChange={(event) => setSecondPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                        {error?<p>{message}</p>:<p></p>}
                    </form>

                    <p className='container my-2'>Already have an account ?</p>
                    <Link to='/' className="btn btn-secondary">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;