const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute = require("./routes/auth")
const chatRoute = require("./routes/chat")
const messageRoute = require("./routes/message")

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

app.listen(5000, () => {
    console.log("App is listening")
})