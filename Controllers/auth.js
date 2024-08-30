const express = require('express');
const jwt = require('jsonwebtoken');
const serverResponse = require('../utilsServer/serverResponse');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UserModel = require('../models/User');
const PostModel = require('../models/Post');
const array = require('../utilsServer/arraysVallidator');

// Get data from the env file
require("dotenv").config();
const { KEY_SECRET } = process.env;

const router = express.Router();

const checkIfUserNameExists = async (userName) => {
    const user = await UserModel.findOne({ userName });
    if (user) {
        return user;
    }
}

const checkIfUserNameExistsWithPassword = async (userName, password) => {
    const response = {
        message: '',
        user: '',
        userFound: false,
        userPasswordMatch: false
    };

    const user = await UserModel.findOne({ userName });
    if (user) {
        response.user = user;
        response.userFound = true;

        // Compare the password from the database
        const match = await bcrypt.compare(password, user.password);

        // Check if the encrypted password matches
        if (match) {
            response.userPasswordMatch = true;
            response.message = "User found with the correct password";
        } else {
            response.message = "User found but the password does not match";
        }
    } else {
        response.message = "User not found";
    }

    return response;
}

router.get('/getAlluser', async (req, res) => {
    try {
        const allUsers = await UserModel.find({});
        return serverResponse(res, 200, allUsers);
    } catch (e) {
        return serverResponse(res, 500, "Request to fetch all users failed");
    }
});

router.get('/getuser/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await UserModel.findById(userId);
        return serverResponse(res, 200, user);
    } catch (e) {
        return serverResponse(res, 500, "Request to fetch user failed");
    }
});

router.post("/getUserWithToken", async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return serverResponse(res, 500, { message: "Login required" });
        } else {
            // Decode the token
            const decoded = jwt.verify(token, KEY_SECRET);
            const user = await UserModel.findById(decoded.id);
            return serverResponse(res, 200, user);
        }
    } catch (error) {
        console.log(error);
        return serverResponse(res, 500, { message: "Internal error occurred: " + error });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { userName, password, profilepic, posts } = req.body;
        const response = await checkIfUserNameExists(userName);

        if (response) {
            return serverResponse(res, 500, { message: "User already exists" });
        }

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                return serverResponse(res, 500, { message: "Error occurred with the password" });
            }

            // If the user does not exist, save the user in the database and return a token
            const newUser = new UserModel({ userName, password: hash, profilepic, posts });
            await newUser.save();
            const IDuser = newUser._id;

            let token = jwt.sign({ id: IDuser }, KEY_SECRET, { expiresIn: 7200 });
            return serverResponse(res, 200, { token: token, message: "Registration successful", newUser });
        });

    } catch (e) {
        return serverResponse(res, 500, "Request to add a user to the database failed: " + e);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        const response = await checkIfUserNameExistsWithPassword(userName, password);
        console.log(response);

        if (!response.userFound) {
            return serverResponse(res, 500, { message: response.message });
        }
        if (!response.userPasswordMatch) {
            return serverResponse(res, 500, { message: response.message });
        }

        const IDuser = response.user._id;
        // If everything is good, provide a confirmation token to log in
        let token = jwt.sign({ id: IDuser }, KEY_SECRET, { expiresIn: 7200 });
        return serverResponse(res, 200, { token: token, user: response.user, message: response.message });

    } catch (e) {
        return serverResponse(res, 500, "Request to log in failed");
    }
});

router.put('/editUser/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const keyArrays = Object.keys(req.body);
        const updateIsValid = keyArrays.every((key) => array.arraysValidationKeysUser.includes(key));

        if (!updateIsValid) {
            return serverResponse(res, 500, "Cannot update this key");
        } else {
            const user = await UserModel.findById(userId);
            if (user) {
                keyArrays.forEach(key => user[key] = req.body[key]);
                await user.save();
                return serverResponse(res, 200, { user: user, message: "User has been updated" });
            } else {
                return serverResponse(res, 500, "User not found");
            }
        }

    } catch (e) {
        return serverResponse(res, 500, "Request to update user failed");
    }
});

router.delete('/deleteuser/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        await UserModel.findByIdAndDelete(userId);
        return serverResponse(res, 200, "User has been deleted");
    } catch (e) {
        return serverResponse(res, 500, "Request to delete user failed");
    }
});

router.put('/addposttouser/:userId', async (req, res) => {
    const userId = req.params.userId;
    const postID = req.body.postid;
    try {
        const user = await UserModel.findById(userId);
        if (user) {
            user.posts.push(postID);
            await user.save();
            return serverResponse(res, 200, "Successfully updated user's post array");
        }
    } catch (e) {
        return serverResponse(res, 500, "Request to add post to user failed");
    }
});

router.delete('/deletepostfromuser/:postid', async (req, res) => {
    const postId = req.params.postid;
    try {
        const post = await PostModel.findById(postId);
        const userId = post.user_id;
        const user = await UserModel.findById(userId);

        const indexItem = user.posts.findIndex((item) => item === postId);
        user.posts.splice(indexItem, 1);
        await user.save();

        return serverResponse(res, 200, "Post has been removed from user's post array");
    } catch (e) {
        return serverResponse(res, 500, "Request to delete post failed");
    }
});

module.exports = router;
