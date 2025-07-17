module.exports = (io) => {
    io.on("connection", (socket) => {
      console.log("New client connected");
  
      socket.on("joinRoom", (room) => {
        socket.join(room);
      });
  
      socket.on("sendMessage", ({ room, message }) => {
        io.to(room).emit("receiveMessage", message);
      });
  
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  };
  