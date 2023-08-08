const verifyToken = require("../middleware");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");

const router = require("express").Router();

// SEND A MESSAGE
router.post("/",verifyToken,async(req,res)=>{
    try {     
        const {chatId,message,image} = req.body;
        let newMessage = await Message.create({
            chatId,
            message,
            image,
            sender:req.user.userId
        })
        await Chat.findByIdAndUpdate(chatId,{latestMessage:newMessage})

        newMessage = await newMessage.populate("sender","userName email profilePicture")
        newMessage = await newMessage.populate("chatId")
        newMessage = await User.populate(newMessage,{path:"chatId.members",select:"userName email profilePicture"})

        res.status(200).json(newMessage)
    } catch (error) {
        res.status(500).json(error)
    }

})

//FETCH ALL MESSAGES OF A CHAT
router.get("/:chatId",verifyToken,async(req,res)=>{
    try {
        const messages = await Message.find({chatId:req.params.chatId}).populate("sender","userName email profilePicture").populate("chatId")
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router