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

app.listen(5000, console.log("Server Started on PORT ${PORT}"));



