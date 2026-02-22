const ChatMessage = require('../models/ChatMessage');
const User = require('../models/User');

const onlineUsers = new Map();

const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`🟢 Socket connected: ${socket.id}`);

    // User join
    socket.on('user:join', async (userId) => {
      onlineUsers.set(userId, socket.id);
      socket.userId = userId;
      io.emit('users:online', Array.from(onlineUsers.keys()));
    });

    // Join room (course chat / live class)
    socket.on('room:join', (roomId) => {
      socket.join(roomId);
      socket.to(roomId).emit('room:user-joined', {
        userId: socket.userId,
        socketId: socket.id,
      });
    });

    // Leave room
    socket.on('room:leave', (roomId) => {
      socket.leave(roomId);
      socket.to(roomId).emit('room:user-left', {
        userId: socket.userId,
      });
    });

    // Chat message
    socket.on('chat:message', async (data) => {
      try {
        const { room, message, type = 'text', replyTo, isAnonymous } = data;

        const chatMessage = await ChatMessage.create({
          room,
          sender: socket.userId,
          message,
          type,
          replyTo,
          isAnonymous,
        });

        const populated = await ChatMessage.findById(chatMessage._id)
          .populate('sender', 'name avatar')
          .populate('replyTo', 'message sender');

        io.to(room).emit('chat:message', populated);
      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Typing indicator
    socket.on('chat:typing', (data) => {
      socket.to(data.room).emit('chat:typing', {
        userId: socket.userId,
        name: data.name,
      });
    });

    socket.on('chat:stop-typing', (data) => {
      socket.to(data.room).emit('chat:stop-typing', {
        userId: socket.userId,
      });
    });

    // Live class events
    socket.on('class:hand-raise', (data) => {
      io.to(data.roomId).emit('class:hand-raise', {
        userId: socket.userId,
        name: data.name,
      });
    });

    socket.on('class:poll-vote', (data) => {
      io.to(data.roomId).emit('class:poll-update', data);
    });

    socket.on('class:poll-create', (data) => {
      io.to(data.roomId).emit('class:poll-new', data);
    });

    socket.on('class:whiteboard-draw', (data) => {
      socket.to(data.roomId).emit('class:whiteboard-draw', data);
    });

    // Notifications
    socket.on('notification:send', (data) => {
      const targetSocket = onlineUsers.get(data.userId);
      if (targetSocket) {
        io.to(targetSocket).emit('notification:new', data.notification);
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      if (socket.userId) {
        onlineUsers.delete(socket.userId);
        io.emit('users:online', Array.from(onlineUsers.keys()));
      }
      console.log(`🔴 Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = { initSocket, onlineUsers };
