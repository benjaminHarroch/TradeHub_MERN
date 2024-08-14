import "./css/Post.css"

// Icons
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NearMeIcon from '@mui/icons-material/NearMe';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useNavigate } from "react-router-dom";



function Post({postImg,postUserName,postTime,postDescription,userId}) {

    const Navigate=useNavigate();
      
  return (
        <div className="post">
            <div className="postTop">
                <Avatar sx={{cursor:'pointer'}} onClick={()=>Navigate(`/Profile/${userId}`)} src="https://th.bing.com/th/id/OIP.TKaUFxDz8t2louvtN75DTgHaE7?rs=1&pid=ImgDetMain" className="postAvatar" />

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