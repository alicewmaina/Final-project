const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const listEndpoints = require('express-list-endpoints');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

require("./socket/socketHandlers")(io);

const PORT = process.env.PORT || 5000;

const connectDB = require('./config/mongodb');

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(listEndpoints(app));
  });
})
  .catch(err => console.error(err));
