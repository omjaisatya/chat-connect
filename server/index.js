const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const connectDB = require("./db/connection");
const { addUser, getUser, removeUser } = require("./helper");
const Room = require("./models/Room");
const { PORT } = require("./config/envConfig");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const Port = PORT || 5000;

// Connect to the database
connectDB();

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  Room.find().then((result) => {
    socket.emit("output-rooms", result);
  });

  socket.on("create-room", (name) => {
    const room = new Room({ name });
    room.save().then((result) => {
      io.emit("room-created", result);
    });
  });

  socket.on("join", ({ name, room_id, user_id }) => {
    const { error, user } = addUser({
      socket_id: socket.id,
      name,
      room_id,
      user_id,
    });

    socket.join(room_id);

    if (error) {
      console.error("Join error:", error);
    } else {
      console.log("User joined:", user);
    }
  });

  socket.on("sendMessage", (message, room_id, callback) => {
    const user = getUser(socket.id);

    if (user) {
      const msgToStore = {
        name: user.name,
        user_id: user.user_id,
        room_id,
        text: message,
      };

      io.to(room_id).emit("message", msgToStore);
      callback();
    }
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      console.log("User disconnected:", user);
    }
  });
});

server.listen(Port, () => {
  console.log(`Server listening on port ${Port}`);
});
