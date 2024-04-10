const express = require("express");
const app = express();
const PORT = 5000;

const http = require("http").Server(app);
const cors = require("cors");
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.get("/", (req, res) => {
  res.json({
    message: "hello",
  });
});

const users = [];

io.on("connection", (socket) => {
  console.log(`${socket.id} user has connected`);

  socket.on("message", (data) => {
    io.emit("response", data);
  });

  socket.on("newUser", (data) => {
    users.push(data);

    socket.emit("responseNewUser", users);
  });

  socket.on("typing", (data) => socket.broadcast.emit("responseTyping", data));

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});

http.listen(PORT, () => {
  console.log("server has been started");
});
