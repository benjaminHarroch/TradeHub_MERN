import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StorysContainer from './StorysContainer';
import AddPost from './AddPost';
import PostFeed from './PostFeed';
import "./css/FeedHomePageContainer.css"; // Ensure to create and import this CSS file for custom styles

function FeedHomePage() {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPostsFromDb();
    }, []);

    const fetchPostsFromDb = () => {
        axios.get(`https://tradehub-mern.onrender.com/post/getAllPost`)
            .then(res => {
                setPost(res?.data.reverse());
                setLoading(false);
            })
            .catch(err => {
                console.log("error", err.response);
                setError('Failed to fetch posts. Please try again.');
                setLoading(false);
            });
    };

    return (
        <div className='FeedHomePageContainer'>
            <StorysContainer />
            <AddPost posts={posts} setPost={setPost} />
            {loading ? (
                <div className='loading-container'>
                    Loading posts...
                </div>
            ) : error ? (
                <div className='error-container'>
                    {error}
                </div>
            ) : posts.length>0?(
                <PostFeed posts={posts} setPost={setPost} />
            ) : <div>please insert the first porst in the TradeHub social</div>}
        </div>
    );
}

export default FeedHomePage;

