import React, { useState, useContext } from 'react';
import './css/AddPost.css';
import axios from 'axios';
import { storage } from './utils/firebase'; // Import the storage from Firebase
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import LoadingSpinner from './LoadingSpinner'; // Assuming this is a loading spinner component
import Avatar from '@mui/material/Avatar';
import Videocam from '@mui/icons-material/Videocam';
import PhotoLibrary from '@mui/icons-material/PhotoLibrary';
import InsertEmoticon from '@mui/icons-material/InsertEmoticon';
import UserContext from './context/userContext';
import { Alert } from 'bootstrap';

function AddPost({ posts, setPost }) {
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(input);

        if (imageUrl) {
            await ImageUpload();
        } else {
            // Create a new post without uploading an image
            const newPost = {
                userName: user.userName,
                user_id: user.user_id,
                description: input,
                numOfLike: 0,
                image: '', // No image URL
                date: new Date().toLocaleDateString()
            };
            try {
                await axios.post('http://localhost:8000/post/addPost', newPost);
                setPost([...posts, newPost]);
            } catch (err) {
                alert('Error creating post');
            }
        }
        
        // Clear form
        setInput('');
        setImageUrl('');
    }

    const ImageUpload = async () => {
        setLoading(true);
        console.log("Starting image upload to Firebase...");

        try {
            // Fetch the image from the URL and convert it to a blob
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            const storageRef = ref(storage, `profile_pics/${input}.png`);
            const uploadTask = uploadBytesResumable(storageRef, blob);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    console.error("Upload failed:", error);
                    alert("Image upload failed, please try again.");
                    setLoading(false);
                },
                async () => {
                    console.log("Upload successful! Getting download URL...");
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log("Download URL obtained:", downloadURL);

                    const newPost = {
                        userName: user.userName,
                        user_id: user.user_id,
                        description: input,
                        numOfLike: 0,
                        image: downloadURL,
                        date: new Date().toLocaleDateString()
                    };

                    try {
                        await axios.post('http://localhost:8000/post/addPost', newPost);
                        let arrayNewPost=[...posts,newPost];
                        setPost(arrayNewPost);
                    } catch (err) {
                        alert('Error creating post');
                    }

                    setLoading(false);
                }
            );
        } catch (err) {
            setLoading(false);
            alert('Error fetching image try again or another image please', err);
        }
    }

    return (
        <div className="AddPostContainer">
            <div className="AddPostContainerTop">
                <Avatar  
                    alt="User Profile"
                    src={user.profilepic}
                />
                <form onSubmit={handleSubmit}>
                    <input 
                        value={input} 
                        onChange={e => setInput(e.target.value)} 
                        className="AddPostInput" 
                        placeholder={`What's on your mind?`} 
                    />
                    <input
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)} 
                        placeholder={"Image URL (Optional)"} 
                    />
                    <button type="submit">Post</button>
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
            {loading && <LoadingSpinner />}
        </div>
    )
}

export default AddPost;
