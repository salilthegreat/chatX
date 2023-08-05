const router = require("express").Router()
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//jsonwebtoken creation function
const createAccessToken = ({ userId, userName }) => {
    return jwt.sign({ userId, userName }, process.env.JWT_SECRET, { expiresIn: "5d" })
}

//REGISTER

router.post("/", async (req, res) => {
    const { userName, password, profilePicture } = req.body;
    const user = await User.findOne({ userName })
    if (user) {
        return res.status(401).json("Username already taken")
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            userName,
            password: hashedPassword,
            profilePicture
        })
        const savedUser = await newUser.save();
        const accessToken = createAccessToken({ userId: savedUser._id, userName })
        res.status(200).json({ ...savedUser._doc, accessToken })
    } catch (error) {
        res.status(500).json(error)
    }
})

//LOGIN

router.post("/login", async(req,res)=>{
    const {userName,password} = req.body;
    const user = await User.findOne({userName});
    if(!user) {
        return res.status(401).json("Invalid Username")
    }
    const isValid = await bcrypt.compare(password,user.password);
    if(!isValid){
        return res.status(401).json("Invalid Password")
    }

    try {     
        const accessToken = createAccessToken({ userId: user._id, userName })
        res.status(200).json({...user._doc,accessToken})
    } catch (error) {
        res.status(500).json(error)
    }

})



module.exports = router