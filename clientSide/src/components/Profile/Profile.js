import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from '../Post';
import './Profile.css';
import NavBar from '../NavBar';
import Chat from '../NewChat'; // Import the Chat component
import ChatPage from '../ChatPage';

const Profile = () => {
    const [post, setPost] = useState([]);
    const [userProfile, setUserProfile] = useState(null); // State for user details
    const [showChat, setShowChat] = useState(false); // State to control chat visibility
    const { id } = useParams();

    // Function to fetch posts based on profile ID
    function fetchPostsFromDb() {
        axios.get(`https://tradehub-mern.onrender.com/post/getPostOfid/${id}`)
            .then(res => {
                setPost(res?.data);
                fetchUser(id); // Fetch user details after posts are fetched
            })
            .catch(err => console.log("error", err.response));
    }

    // Function to fetch user details
    function fetchUser(userId) {
        axios.get(`https://tradehub-mern.onrender.com/auth/getuser/${userId}`)
            .then(res => {
                console.log('res from get user',res);
                setUserProfile(res.data[0]);
                setShowChat(true);
            })
            .catch(err => console.log("error", err.response));
    }

    useEffect(() => {
        fetchPostsFromDb();
    }, [id]);

    useEffect(() => {
        fetchUser(id);
    }, [id]);

    return (
        <div>
            <NavBar color={'#FFDAB9'} />
            <div className="profile-page">
                <div className="cover-photo" >
                    <img style={{height:'500px'}} src={`${userProfile?.profilepic}`} alt="Cover" />
                </div>
                <div className="profile-info">
                    <div className="profile-picture">
                        <img src={`${userProfile?.profilepic}`} alt="Profile" />
                    </div>
                    <div className="user-details">
                        <h1>{userProfile?.userName || "----"}</h1>
                        <p>@{userProfile?.userName || "----"}</p>
                        <button>Add Friend</button>
                        {//<button onClick={handleChatToggle}>Message</button>}}
} 
                    { showChat && <ChatPage otherUser={userProfile} />}
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
                        {post.map((post) => (
                            <div className="post-Profile" key={post.id}>
                                <Post
                                    userId={post.user_id}
                                    postImg={post.image}
                                    postUserName={post.userName}
                                    postTime={post.date}
                                    postDescription={post.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default Profile;
