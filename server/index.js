const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute = require("./routes/auth")

dotenv.config();

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("common"))
app.use("/api/auths", userRoute)

app.get("/", (req, res) => {
    console.log("ram")
})


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connected successfully")
}).catch((error) => {
    console.log(error)
})

app.listen(5000, () => {
    console.log("App is listening")
})