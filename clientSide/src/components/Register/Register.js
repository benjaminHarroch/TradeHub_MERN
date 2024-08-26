import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import { storage } from '../utils/firebase'; // Import the storage from Firebase
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import LoadingSpinner from '../LoadingSpinner';

const Register = () => {
    const [userName, setUserName] = useState('');
    const [profilepic, setProfilePic] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);

    // Handle file selection
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log("Selected file:", file); // Log selected file
        setSelectedImage(file);

        // Generate a preview of the image
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            console.log("Image preview generated."); // Log when preview is generated
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        console.log("Form submitted."); // Log when form is submitted

        if (password !== secondPassword) {
            setError(true);
            setMessage("Check your password - passwords do not match");
            console.log("Passwords do not match.");
            setLoading(false); // Log password mismatch
            return;
        }

        if (!selectedImage) {
            alert('Please select an image before submitting.');
            console.log("No image selected."); 
            setLoading(false);// Log when no image is selected
            return;
        }

        try {
            console.log("Starting image upload to Firebase..."); // Log before starting upload
            const storageRef = ref(storage, `profile_pics/${selectedImage.name}`);
            const uploadTask = uploadBytesResumable(storageRef, selectedImage);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`); // Log upload progress
                },
                (error) => {
                    console.error("Upload failed:", error); // Log any errors during upload
                    alert("Image upload failed, please try again.");
                },
                async () => {
                    console.log("Upload successful! Getting download URL..."); // Log on successful upload
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log("Download URL obtained:", downloadURL); // Log the obtained download URL
                    setProfilePic(downloadURL);

                    console.log("Registering user..."); // Log before registration
                    axios.post('https://tradehub-mern.onrender.com/auth/register', {
                        userName,
                        password,
                        profilepic: downloadURL
                    }).then((response)=>{
                    console.log('response from server',response)
                       // Save the token and user data
                    const { newUser } = response.data;
                    //console.log(newUser._id);

                    window.localStorage.setItem("access-token", newUser.token);
                    console.log("User registered:", newUser); // Log user data after registration
                    setUser({
                        user_id: newUser._id,
                        userName: newUser.userName,
                        profilepic: newUser.profilepic,
                        posts: newUser.posts,
                        token: newUser.token,
                        trades: newUser.trades
                    });
                    setLoading(false);
                    alert("Registered successfully! Please Login to proceed.");
                    navigate('/HomePage');
                      
                    }).catch((err)=>{
                      setLoading(false);
                      if (err.response?.data?.message === 'the user is already exist') {
                        alert("Username already registered! Please Login to proceed.");
                        navigate('/');
                    }
                    })
                }
            );
        } catch (err) {
            setLoading(false);
            console.error('Error during registration:', err); // Log any errors during registration
        }
    }

    return (
        <div>
           <div className="d-flex justify-content-center align-items-center text-center vh-100" style={{ backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))" }}>
                <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
                    <h2 className='mb-3 text-primary'>Register</h2>
                    {loading?<LoadingSpinner />: <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>UserName</strong>
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
                                <strong>Profile Picture</strong>
                            </label>
                            <input
                                placeholder="Upload your profile pic"
                                className="form-control"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {preview && <img   style={{ width: '150px', height: 'px', objectFit: 'cover' }} src={preview} alt="Profile preview" className="img-thumbnail mt-2" />}
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
                            <label htmlFor="exampleInputPassword2" className="form-label">
                                <strong>Password Validation</strong>
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
                        {error && <p className="text-danger">{message}</p>}
                    </form>
}
                    <p className='container my-2'>Already have an account?</p>
                    <Link to='/' className="btn btn-secondary">Login</Link>
                </div>
            </div>

        </div>
    )
}

export default Register;
