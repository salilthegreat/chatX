const mongoose = require("mongoose");
const { Schema } = mongoose

const ChatSchema = new mongoose.Schema({
    chatName: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    admin: { type: Schema.Types.ObjectId, ref: "User" },
    latestMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    isGroupChat: { type: Boolean, default: false }
},
    { timestamps: true })

module.exports = mongoose.model("Chat", ChatSchema)