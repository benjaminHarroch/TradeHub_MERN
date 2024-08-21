const handleSocket = (io) => {

    io.on('connection', (socket) => {
      console.log('A user connected');
  
      // Join a room based on the users' IDs
      socket.on('joinRoom', ({ userId, otherUserId }) => {
        // Ensure both users are joining the same room
        const roomId = [userId, otherUserId].sort().join('_');
        socket.join(roomId);
        console.log(`${userId} joined room ${roomId}`);
      });
  
      // Handle sending messages
      socket.on('sendMessage', ({ roomId, messageData }) => {
        io.to(roomId).emit('receiveMessage', messageData);
        console.log(`${messageData} sent to ${roomId}`);
      });
  
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
  };

  module.exports=handleSocket;