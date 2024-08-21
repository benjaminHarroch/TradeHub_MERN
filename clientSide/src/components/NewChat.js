import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { Box, TextField, Button, Avatar, Typography, Paper, List, ListItem, ListItemAvatar, ListItemText, Modal } from '@mui/material';
import UserContext from './context/userContext';

const socket = io.connect('http://localhost:8000'); // Ensure this is your server URL

const NewChat = ({ otherUser, open, handleClose }) => {
    const { user } = useContext(UserContext);   
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const roomId = user?.user_id && otherUser?._id 
        ? (user.user_id < otherUser._id 
            ? `${user.user_id}_${otherUser._id}` 
            : `${otherUser._id}_${user.user_id}`)
        : null;

    useEffect(() => {
        if (user?.user_id && otherUser?._id) {
            // Join the chat room
            socket.emit('joinRoom', { userId: user.user_id, otherUserId: otherUser._id });

            // Listen for incoming messages once
            socket.on('receiveMessage', (messageData) => {
                setMessages((prevMessages) => [...prevMessages, messageData]);
            });
        }

        // Clean up the socket listener when the component unmounts
        return () => {
            socket.off('receiveMessage');
        };
    }, [user?.user_id, otherUser?._id]);

    const sendMessage = () => {
        if (message.trim() !== '' && roomId) {
            const messageData = {
                user: user.userName,
                userId: user.user_id,  // Include userId to differentiate sender/receiver
                text: message,
                time: new Date().toLocaleTimeString(),
            };

            // Emit the message without adding it locally
            socket.emit('sendMessage', { roomId, messageData });
            setMessage('');
        }
    };

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="chat-modal" aria-describedby="chat-modal-description">
            <Paper elevation={3} sx={{ p: 2, mt: 4, width: '100%', maxWidth: '500px', mx: 'auto', borderRadius: '10px' }}>
                <Typography variant="h6" gutterBottom>Chat with {otherUser.userName}</Typography>
                <List sx={{ maxHeight: '300px', overflowY: 'auto', mb: 2 }}>
                    {messages.map((msg, index) => (
                        <ListItem 
                            key={index} 
                            sx={{ 
                                display: 'flex', 
                                justifyContent: msg.userId === user.user_id ? 'flex-end' : 'flex-start' 
                            }}
                        >
                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    backgroundColor: msg.userId === user.user_id ? '#E3F2FD' : '#FFF8E1', 
                                    borderRadius: '10px',
                                    padding: '8px 12px',
                                    maxWidth: '70%',
                                }}
                            >
                                <ListItemAvatar sx={{ order: msg.userId === user.user_id ? 2 : 1 }}>
                                    <Avatar src={msg.userId === user.user_id ? user.profilepic : otherUser.profilepic}>
                                        {msg.user.charAt(0).toUpperCase()}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${msg.user}: ${msg.text}`}
                                    secondary={msg.time}
                                    sx={{ ml: msg.userId === user.user_id ? 1 : 0, mr: msg.userId === user.user_id ? 0 : 1 }}
                                />
                            </Box>
                        </ListItem>
                    ))}
                </List>
                <Box display="flex" mt={2}>
                    <TextField
                        label="Type your message..."
                        variant="outlined"
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
                    />
                    <Button variant="contained" color="primary" onClick={sendMessage} sx={{ ml: 2 }}>
                        Send
                    </Button>
                </Box>
                <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ mt: 2 }}>
                    Close Chat
                </Button>
            </Paper>
        </Modal>
    );
};

export default NewChat;
