

import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import { useContext } from 'react';
import UserContext from '../Context/userContext';


export const UploadPhoto=({userProfile,setUserProfile})=> {

  const [images, setImages] = React.useState([]);
  const {user,setUser}=useContext(UserContext);
  console.log("user",user)
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    setUserProfile({...userProfile,profilepic:imageList[0].data_url})

    /*axios.put(`http://localhost:8000/auth/editUser/${userProfile._id}`,{profilepic:imageList[0].data_url})
    .then((res)=>console.log(res))
    .cath((e)=>console.log(e))*/

    uploadImage(imageList);


  };

  const uploadImage=(imageList)=>{

    const formdata= new FormData();
    formdata.append("file",imageList[0].data_url);
    formdata.append("upload_preset","juniortraders")

    axios.post("https://api.cloudinary.com/v1_1/dtdpe49rg/image/upload",formdata)
    .then((res)=>{

       axios.put(`http://localhost:8000/auth/editUser/${userProfile._id}`,{profilepic:res.data.secure_url})
      .then((res)=>console.log(res))
      .cath((e)=>console.log(e))

    })
    .catch((e)=>console.log(e))
  }

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg"]}
      >
        {({
          imageList,
          onImageUpload,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
           {user.user_id==userProfile._id&&<button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              choose your profile picture
            </button>
            }
        
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}


