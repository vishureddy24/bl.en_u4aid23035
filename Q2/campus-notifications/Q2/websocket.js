let io;

module.exports = {
  init: (server) => {
    io = require('socket.io')(server, {
      cors: {
        origin: '*'
      }
    });

    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      socket.on('join', (studentId) => {
        socket.join(`student_${studentId}`);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    return io;
  },

  getIO: () => {
    if (!io) throw new Error('Socket.io not initialized');
    return io;
  }
};
