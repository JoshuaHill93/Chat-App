const express = require("express");
const connectDB = require("./config/db")
//const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const path = require('path')
require('dotenv').config({path:path.resolve(__dirname,'./.env')})
const messageRoutes = require("./routes/messageRoutes");


//dotenv.config();
connectDB();
const app = express();


app.use(express.json());
app.use(cors());
app.get("/",(req,res) => {
    res.send("Hello Welcome to Chatopia")
});

app.use("/api/user", userRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);



const PORT = process.env.PORT || 5000;

 const server = app.listen(5000, console.log("Server Started on PORT ${PORT}"));




const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin:"http://localhost:3000",
    },
});

io.on("connection", (socket) => {
            console.log("connected to socket.io");

            socket.on("setup", (userData) => {
                socket.join(userData._id);
                console.log(userData._id);
                socket.emit("connected");
            });

            socket.on("join chat", (room) => {
                socket.join(room);
                console.log("User Joined Room: " + room);
            });

            socket.on("new message", (newMessageRecieved) => {
                
            });
});






