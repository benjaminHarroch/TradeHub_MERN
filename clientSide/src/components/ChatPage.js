import React, { useState } from 'react';
import NewChat from './NewChat';


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
            <button  onClick={handleOpenChat} >
                open chat
            </button>
            <NewChat otherUser={otherUser} open={isChatOpen} handleClose={handleCloseChat} />
        </div>
    );
};

export default ChatPage;
