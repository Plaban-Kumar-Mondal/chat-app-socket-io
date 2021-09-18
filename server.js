const path = require("path");
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

const DATABASE = process.env.DATABASE
  ? process.env.DATABASE
  : `mongodb://localhost:27017/chat-app-socket-io`;

mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

io.on("connection", (socket) => {});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`App is running on port ${PORT}`)
);
