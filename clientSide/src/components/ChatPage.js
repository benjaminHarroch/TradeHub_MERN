import React, { useState } from 'react';
import NewChat from './NewChat';
import {Button } from '@mui/material';

const ChatPage = ({otherUser}) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
  
    const handleOpenChat = () => {
        setIsChatOpen(true);
    };

    const handleCloseChat = () => {
        setIsChatOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpenChat}>
                Open Chat
            </Button>
            <NewChat otherUser={otherUser} open={isChatOpen} handleClose={handleCloseChat} />
        </div>
    );
};

export default ChatPage;
