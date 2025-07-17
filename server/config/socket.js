let ioInstance;

const initSocket = (server) => {
  const { Server } = require('socket.io');
  ioInstance = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  require('../socket/socketHandlers')(ioInstance);
  return ioInstance;
};

const getIO = () => {
  if (!ioInstance) {
    throw new Error('Socket.io not initialized!');
  }
  return ioInstance;
};

module.exports = { initSocket, getIO }; 