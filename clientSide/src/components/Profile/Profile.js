import React, { useContext, useEffect ,useState} from 'react';
import UserContext from '../context/userContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from '../Post';
import './Profile.css';
import NavBar from '../NavBar';

const Profile = () => {

    const [post,setPost]=useState([]);
    const {user,setUser}=useContext(UserContext)
    const {id}=useParams();


    function fetchPostsFromDb(){

        axios.get(`http://localhost:8000/post/getPostOfid/${id}`)
        .then(res => {
          console.log('res',res);
          setPost(res?.data);
        }).catch(err=>console.log("error",err.response));
    
    } 

    useEffect(()=>{

        fetchPostsFromDb();
        
    },[])

    return (
        <div><NavBar color={'#FFDAB9'}/>
        <div className="profile-page">
            <div className="cover-photo">
                <img src="https://via.placeholder.com/850x315" alt="Cover" />
            </div>
            <div className="profile-info">
                <div className="profile-picture">
                    <img src="https://via.placeholder.com/150" alt="Profile" />
                </div>
                <div className="user-details">
                    <h1>{post[0]?.userName?post[0]?.userName:"----"}</h1>
                    <p>@{post[0]?.userName?post[0]?.userName:"----"}</p>
                    <button>Add Friend</button>
                    <button>Message</button>
                </div>
            </div>
            <div className="profile-content">
                <div className="profile-nav">
                    <ul>
                        <li>Posts</li>
                        <li>About</li>
                        <li>Friends</li>
                        <li>Photos</li>
                        <li>More</li>
                    </ul>
                </div>
                <div className="posts">
                   { 
                    post.map((post)=>{ 
                    return(
                           <div className="post-Profile">
                            <Post  userId={post.user_id} postImg={post.image}
                            postUserName={post.userName} postTime={post.date} postDescription={post.description} />
                            </div>)

                        })
                    }
                    
                </div>
            </div>
        </div>
        </div>
    );
};

export default Profile;
