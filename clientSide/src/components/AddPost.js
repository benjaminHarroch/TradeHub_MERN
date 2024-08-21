import React, { useState } from 'react';
import './css/AddPost.css'
import { useContext } from 'react';
import axios from 'axios';

// icons
import Avatar from '@mui/material/Avatar';
import Videocam from '@mui/icons-material/Videocam';
import PhotoLibrary from '@mui/icons-material/PhotoLibrary'
import InsertEmoticon from '@mui/icons-material/InsertEmoticon'
//context
import UserContext from './context/userContext';



function AddPost ({posts,setPost}) {


    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const {user}=useContext(UserContext);
    //console.log(user);

    const handleSubmit = e => {

        e.preventDefault();
        console.log(input);
        const date=new Date().toLocaleDateString();
        console.log(date);

        const newPost={
            "userName":user.userName,
            "user_id": user.user_id,
            "description": input,
            "numOfLIke": 0,
            "image": imageUrl,
            "date":date
        }

        axios.post('http://localhost:8000/post/addPost',newPost)
       
        setPost([...posts,newPost])

        // clear form
        setInput('');
        setImageUrl('');
    }
    return (
        <div className="AddPostContainer">
            <div className="AddPostContainerTop">
                <Avatar  
                 alt="User Profile"
                 src={user.profilepic}
                />
                <form>
                    <input 
                        value={input} 
                        onChange={e => setInput(e.target.value)} 
                        className="AddPostInput" 
                        placeholder={`What's on your mind,?`} 
                    />
                    <input
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)} 
                        placeholder={"Image URL (Optional)"} />
                    <button onClick={handleSubmit} type="submit">Hidden submit</button>
                </form>
            </div>

            <div className="messageSenderBottom">
                <div className="messageSenderOption">
                    <Videocam style={{color: 'red'}} />
                    <h3>Live Video</h3>
                </div>

                <div className="messageSenderOption">
                    <PhotoLibrary style={{color: 'green'}} />
                    <h3>Photo/Video</h3>
                </div>

                <div className="messageSenderOption">
                    <InsertEmoticon style={{color: 'orange'}} />
                    <h3>Feeling/Activity</h3>
                </div>
            </div>
        </div>
    )
}

export default AddPost;