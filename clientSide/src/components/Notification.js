import React, { useState, useContext, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Avatar, CircularProgress } from '@mui/material';
import NewChat from './NewChat';
import UserContext from './context/userContext';
import axios from 'axios';

const Notification = () => {
    const { user, chats } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [lastMessages, setLastMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLastMessages = async () => {
            try {
                const messagesWithUserPics = await Promise.all(
                    chats.map(async (chat) => {
                        const lastMessage = chat.messages[chat.messages.length - 1];
                        const userIdConversation = chat.roomId.split('_').find(id => id !== user?.user_id);
                        
                        try {
                            const res = await axios.get(`https://tradehub-mern.onrender.com/auth/getuser/${userIdConversation}`);
                            return {
                                userId: userIdConversation,
                                lastMessage,
                                profilePic: res.data.profilepic || `https://randomuser.me/api/portraits/lego/${userIdConversation}.jpg`,
                                otheruserconvarsation: res.data // Fallback if no profile pic
                            };
                        } catch (error) {
                            console.error('Error fetching user data:', error);
                            return {
                                userId: userIdConversation,
                                lastMessage,
                                profilePic: `https://randomuser.me/api/portraits/lego/${userIdConversation}.jpg` // Fallback if no profile pic
                            };
                        }
                    })
                );

                setLastMessages(messagesWithUserPics.filter(msg => msg.lastMessage));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching last messages:', error);
                setLoading(false);
            }
        };

        fetchLastMessages();
    }, [chats, user?.user_id]);

    const handleOpenChat = (userconversation) => {

        setSelectedUser(userconversation);
        setOpen(true);

    };
    useEffect(() => {
       
    }, [selectedUser, open]);


    return (
        <Box>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {lastMessages.map((msg, index) => (
                        <ListItem key={index} onClick={() => handleOpenChat(msg.otheruserconvarsation)} sx={{paddingRight:'40px'}}>
                            <Avatar src={msg.profilePic} alt={msg.userId} sx={{margin:'2px 8px'}}/>
                            <ListItemText
                                primary={`${msg.lastMessage.user}: ${msg.lastMessage.text}`}
                                secondary={msg.lastMessage.time}
                                primaryTypographyProps={{
                                    sx: {
                                        fontSize: '16px', // Adjust as needed
                                        fontWeight: 'bold', // Optional: Makes the user text bold
                                    },
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            )}

            {selectedUser && (
                <NewChat 
                    otherUser={selectedUser} 
                    open={open} 
                    handleClose={() => setOpen(false)} 
                />
            )}
        </Box>
    );
};

export default Notification;
