const fs = require('fs');
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
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

app.use(express.json()) // ??
app.use(express.urlencoded({extended:true})) //??

//get the data from the front end

app.post('/', async(req, res) => {
	const {data, subjectID, pairID} = req.body

    await fs.writeFile(`pair_${pairID}_sub_${subjectID}_data.json`, JSON.stringify(data), err => {
		if (err) {
			console.log(err);
		} else {
			console.log("Successfully saved data.");
		}
    });
});
