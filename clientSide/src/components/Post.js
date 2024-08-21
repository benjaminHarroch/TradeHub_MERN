import "./css/Post.css"

// Icons
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NearMeIcon from '@mui/icons-material/NearMe';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';



function Post({postImg,postUserName,postTime,postDescription,userId}) {

    const [userPost ,setPostUser]=useState();

    const Navigate=useNavigate();
    
    //after get the post with is detaille i fetch the data of the authore of this post
    useEffect(()=>{
          axios.get(`http://localhost:8000/auth/getuser/${userId}`)
          .then((res)=>setPostUser(res.data[0]))
          .catch((err)=>console.log('error with get user',err))
    },[userId])

  return (
        <div className="post">
            <div className="postTop">
                <Avatar sx={{cursor:'pointer'}}
                        onClick={()=>Navigate(`/Profile/${userId}`)}
                        src={`${userPost?.profilepic}`}
                         className="postAvatar" />

                <div className="postTopInfo">
                    <h3>{postUserName}</h3>
                  
                    <p>{postTime}</p>
                </div>
            </div>

            <div className="postBottom">
                <p>{postDescription}</p>
            </div>

            <div className="postImage">
                <img src={postImg} alt=""/>
            </div>

            <div className="postOptions">
                <div className="postOption">
                    <ThumbUpIcon />
                    <p>Like</p>
                </div>

                <div className="postOption">
                    <ChatBubbleOutlineIcon />
                    <p>Comment</p>
                </div>

                <div className="postOption">
                    <NearMeIcon />
                    <p>Share</p>
                </div>

                <div className="postOption">
                    <AccountCircleIcon />
                    <ExpandMoreOutlinedIcon />
                </div>
            </div>
        </div>
  )
}

export default Post;