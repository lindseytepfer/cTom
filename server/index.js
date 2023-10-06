const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
app.use(cors());
app.use(express.json())
const mysql = require('mysql2')


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

    socket.on("client_ready",(socketId) =>{
        io.emit("server_ready", socket.id)
    });
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});


app.use(express.urlencoded({extended:true})) //??

// SAVING DATA TO DB

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '***',
    database: "ctomDB",
});

app.post('/', (req,  res) => {
    const pairID = req.body.pairID;
    const subjectID = req.body.subjectID;
    const block = req.body.block;
    const target = req.body.target;
    const stim = req.body.stim;
    const trait = req.body.trait;
    const rating = req.body.rating;

    db.query("INSERT INTO ratings (pairID, subjectID, block, target, stim, trait, rating) VALUES (?,?,?,?,?,?,?)",
    [pairID, subjectID, block, target, stim, trait, rating], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("values inserted.")
        }
    });
})