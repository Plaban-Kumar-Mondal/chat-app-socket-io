const path = require("path");
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

// importing models
const Message = require("./models/message");

const DATABASE = process.env.DATABASE
  ? process.env.DATABASE
  : `mongodb://localhost:27017/chat-app-socket-io`;

mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(error));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  Message.find().then((result) => {
    socket.emit("old-msg", result);
  });

  socket.emit("welcome-msg", "Welcome to chat app!");

  // getting chats
  socket.on("chatMessage", (msg) => {
    const message = new Message({ msg });
    message.save().then(() => {
      io.emit("chat-msg", msg);
    });
  });
});

const PORT = process.env.PORT || 3000;

// app.listen() doesnt work with socket.io because it creates new server
server.listen(PORT, () =>
  console.log(`App is running on port ${PORT}`)
);
