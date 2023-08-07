const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default:"https://cdn-icons-png.flaticon.com/512/172/172163.png?w=1060&t=st=1691305872~exp=1691306472~hmac=3096a18a59c140eed2e3a902cb714c6f5df5bf71ad7cfe7f3a29487ee8ea3418" }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema)
