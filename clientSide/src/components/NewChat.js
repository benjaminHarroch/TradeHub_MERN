import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { Box, TextField, Button, Avatar, Typography, Paper, List, ListItem, ListItemAvatar, ListItemText, Modal } from '@mui/material';
import UserContext from './context/userContext';

const socket = io.connect('https://tradehub-mern.onrender.com'); // Ensure this is your server URL

const NewChat = ({ otherUser, open, handleClose }) => {
console.log(otherUser)
    const { user, chats, setChats } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const roomId = user?.user_id && otherUser?._id 
        ? (user.user_id < otherUser._id 
            ? `${user.user_id}_${otherUser._id}` 
            : `${otherUser._id}_${user.user_id}`)
        : null;

    useEffect(() => {
        
        if (user?.user_id && otherUser?._id) {
            // Load previous messages from context or localStorage
            const existingChat = chats.find(
                (chat) => chat.roomId === roomId
            );
            if (existingChat) {
                console.log('Existing chat found:', existingChat);
                setMessages(existingChat.messages);
            } else {
                const savedChats = localStorage.getItem('chats');
                console.log('Chats from localStorage:', savedChats);
                const parsedChats = savedChats ? JSON.parse(savedChats) : [];
                const chatFromStorage = parsedChats.find(chat => chat.roomId === roomId);
                if (chatFromStorage) {
                    console.log('Chat from localStorage:', chatFromStorage);
                    setMessages(chatFromStorage.messages);
                }
            }

            // Join the chat room
            socket.emit('joinRoom', { userId: user.user_id, otherUserId: otherUser._id });

            // Listen for incoming messages
            socket.on('receiveMessage', (messageData) => {
                console.log('Received message:', messageData);
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages, messageData];

                    // Update the chat in the context and localStorage
                    const existingChatIndex = chats.findIndex(chat => chat.roomId === roomId);
                    let updatedChats;
                    if (existingChatIndex !== -1) {
                        updatedChats = [
                            ...chats.slice(0, existingChatIndex),
                            { ...chats[existingChatIndex], messages: updatedMessages },
                            ...chats.slice(existingChatIndex + 1),
                        ];
                    } else {
                        updatedChats = [...chats, { roomId, messages: updatedMessages }];
                    }

                    console.log('Updated chats after receiving message:', updatedChats);
                    setChats(updatedChats);
                    localStorage.setItem('chats', JSON.stringify(updatedChats));

                    return updatedMessages;
                });
            });
        }

        return () => {
            console.log('Cleaning up socket listener');
            socket.off('receiveMessage');
        };
    }, [user?.user_id, otherUser?._id, chats, setChats, roomId]);

    const sendMessage = () => {
        if (message.trim() !== '' && roomId) {
            const messageData = {
                user: user.userName,
                userId: user.user_id,
                text: message,
                time: new Date().toLocaleTimeString(),
                otherUser: otherUser
            };

    
            socket.emit('sendMessage', { roomId, messageData });
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, messageData];

                // Update the chat in the context and localStorage
                const existingChatIndex = chats.findIndex(chat => chat.roomId === roomId);
                let updatedChats;
                if (existingChatIndex !== -1) {
                    updatedChats = [
                        ...chats.slice(0, existingChatIndex),
                        { ...chats[existingChatIndex], messages: updatedMessages },
                        ...chats.slice(existingChatIndex + 1),
                    ];
                } else {
                    updatedChats = [...chats, { roomId, messages: updatedMessages }];
                }

                console.log('Updated chats after sending message:', updatedChats);
                setChats(updatedChats);
                localStorage.setItem('chats', JSON.stringify(updatedChats));

                return updatedMessages;
            });
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
