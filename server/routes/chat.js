const verifyToken = require("../middleware");
const Chat = require("../models/Chat");
const User = require("../models/User");

const router = require("express").Router();

//CREATE A CHAT OR FETCH A CHAT WITH 2 USERS
router.post("/createchat", verifyToken, async (req, res) => {
    let chatExist = await Chat.findOne({ isGroupChat: false, members: { $all: [req.user.userId, req.body.recieverId] } }).populate("members", "-password").populate("latestMessage")
    chatExist = await User.populate(chatExist, { path: "latestMessage.sender", select: "-password" })

    if (chatExist) { return res.status(200).json(chatExist) }

    try {
        const newchat = await Chat.create(
            {
                chatName: "sender",
                members: [req.user.userId, req.body.recieverId]
            }
        );
        let savedChat = Chat.findById(newchat._id).populate("members","-password").populate("latestMessage")
        savedChat = await User.populate(savedChat, { path: "latestMessage.sender", select: "-password" })
        res.status(201).json(savedChat)
    } catch (error) {
        res.status(500).json(error.message)
    }
})


//FIND ALL CHATS OF A USER
router.get("/getallchat", verifyToken, async (req, res) => {
    try {
        let chats = await Chat.find({ members: { $in: [req.user.userId] } }).populate("members", "-password").populate("admin","-password").sort({ updatedAt: -1 });
        chats = await User.populate(chats, { path: "latestMessage.sender", select: "-password" })
        res.status(200).json(chats)

    } catch (error) {
        res.status(500).json(error.message)
    }
});

//CREATE A GROUP CHAT 
router.post("/groupchat", verifyToken, async (req, res) => {
    const {  chatName } = req.body;
    let members =  JSON.parse(req.body.members);
    if (members.length < 2) {
        return res.status(400).json("Just talk with each other why are you creating a group")
    }
    members.push(req.user.userId)

    try {
        const newGroup = await Chat.create({
            isGroupChat: true,
            admin: req.user.userId,
            chatName,
            members
        })
        const savedGroup = await Chat.findOne({_id:newGroup._id}).populate("members","-password").populate("admin","-password")

        res.status(200).json(savedGroup)
    } catch (error) {
        res.status(500).json(error)
    }

})

//RENAME GROUP CHAT
router.put("/rename",verifyToken,async(req,res)=>{
    try {
        const {chatName,chatId} = req.body;   
        const updatedChat = await Chat.findByIdAndUpdate(chatId,{chatName},{new:true}).populate("members","-password").populate("admin","-password")
        res.status(200).json(updatedChat)
    } catch (error) {
        res.status(500).json(error)
    }

})


//ADD A MEMBER TO GROUP CHAT
router.put("/addmember",verifyToken,async(req,res)=>{
    try {      
        const{chatId,userId} = req.body;
        const chat = await Chat.findById(chatId).populate("admin")
        if(chat.admin._id == req.user.userId){
         const updatedChat =   await Chat.findByIdAndUpdate(chatId,{$push:{members:userId}},{new:true}).populate("members","-password").populate("admin","-password")
        return res.status(200).json(updatedChat)
        }else{
            return res.status(400).json("You aren't admin")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//ADD A MEMBER TO GROUP CHAT
router.put("/removemember",verifyToken,async(req,res)=>{
    try {      
        const{chatId,userId} = req.body;
        const chat = await Chat.findById(chatId).populate("admin")
        if(chat.admin._id == req.user.userId){
         const updatedChat =   await Chat.findByIdAndUpdate(chatId,{$pull:{members:userId}},{new:true}).populate("members","-password").populate("admin","-password")
        return res.status(200).json(updatedChat)
        }else{
            return res.status(400).json("You aren't admin")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router