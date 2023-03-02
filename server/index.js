const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origins: ["http://localhost:3000/"],
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("buttonClicked", (pair) => {
        // emits to all clients in room
        io.in(pair).emit("userReady", socket.id);
    });

    socket.on("setPair", (data) => {
        socket.join(data);
    });
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});
