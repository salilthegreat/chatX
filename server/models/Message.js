const mongoose = require("mongoose");
const { Schema } = mongoose

const MessageSchema = new Schema({
    chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true }
})

module.exports = mongoose.model("Message", MessageSchema)