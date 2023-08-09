const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute = require("./routes/auth")
const chatRoute = require("./routes/chat")
const messageRoute = require("./routes/message");
const {Server} = require("socket.io")


dotenv.config();

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/auths", userRoute)
app.use("/api/chats", chatRoute)
app.use("/api/messages", messageRoute)



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connected successfully")
}).catch((error) => {
    console.log(error)
})


const server = app.listen(5000, () => {
    console.log("App is listening")
})

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000"
    }
})

io.on("connection",socket=>{
   console.log("A device connected successfully")
   socket.on("joinchat",(room)=>{
    socket.join(room);
    console.log("A user joined room" + room)
   })
   socket.on("send message", (message)=>{
    console.log("message sent to " + message.chatId._id)
    socket.to(message.chatId._id).emit("recieve message",(message))
   })
    socket.on("disconnect",()=>{
        console.log("A user disconnected")
    })
})


