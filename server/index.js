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
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//imports for cloudinary
const cloudinary = require("cloudinary").v2;
const multer = require("multer")
const {CloudinaryStorage} = require("multer-storage-cloudinary")

//configuration for cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

//making a storage 
const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"DEV"
    },
})

//assigning the storage we made from cloudinary to multer for uploadinf
const upload = multer({storage:storage})

//api call for file upload

app.post("/api/upload",upload.single("file"),(req,res)=>{
    try {
        res.status(200).json({file:req.file.path})
    } catch (error) {
        res.status(500).json(error)
    }
})




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
   socket.on("joinchat",(room)=>{
    socket.join(room);
   })
   socket.on("send message", (message)=>{
    socket.to(message.chatId._id).emit("recieve message",(message))
   })

})


