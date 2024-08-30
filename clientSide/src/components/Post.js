import "./css/Post.css"

// Icons
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NearMeIcon from '@mui/icons-material/NearMe';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import UserContext from "./context/userContext";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Description from "./Description";





function Post({postImg,postUserName,postTime,postDescription,userId,postID,posts,setPost}) {

    const [userPost ,setPostUser]=useState();
    const [hover,setHover]=useState(false);
    const {user}=useContext(UserContext)
    const Navigate=useNavigate();
    //console.log('user',user)
    //console.log('befor delete',posts)
    
    //after get the post with is detaille i fetch the data of the authore of this post
    useEffect(()=>{
          axios.get(`https://tradehub-mern.onrender.com/auth/getuser/${userId}`)
          .then((res)=>setPostUser(res.data))
          .catch((err)=>console.log('error with get user',err))
    },[userId])

    const handleDelte=()=>{
        let remove=alertFunction();
        if(remove){
        axios.delete(`https://tradehub-mern.onrender.com/post/deletepost/${postID}`)
        let indexToDelete=posts.findIndex((element)=>element._id==postID)
        posts.splice(indexToDelete,1);
        let newArrayOfPost=[...posts];
        setPost(newArrayOfPost)
        }

    }

    function alertFunction() {
        if (window.confirm('you are sure you want to remove this post?')) {
          return true;
        } else {
          return false;
        }
      }

  return (
        <div className="post" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
            <div className="postTop">
                <Avatar sx={{cursor:'pointer'}}
                        onClick={()=>Navigate(`/Profile/${userId}`)}
                        src={`${userPost?.profilepic}`}
                         className="postAvatar" />

                <div className="postTopInfo">
                    {(hover&&user.user_id==userPost?._id)&&<div onClick={handleDelte} style={{position: 'absolute',top: '30px',right: '30px',fontWeight: '800',cursor:'pointer'}}><DeleteForeverIcon /></div>}
                    <h3>{postUserName}</h3>
                  
                    <p>{postTime}</p>
                </div>
            </div>

            <div className="postBottom">
                <Description text={postDescription} />
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