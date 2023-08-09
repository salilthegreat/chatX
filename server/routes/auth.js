const router = require("express").Router()
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware");

//jsonwebtoken creation function
const createAccessToken = ({ userId, userName }) => {
    return jwt.sign({ userId, userName }, process.env.JWT_SECRET, { expiresIn: "5d" })
}

//REGISTER

router.post("/", async (req, res) => {
    const { email, userName, password, profilePicture } = req.body;
    let user = await User.findOne({ email })
    if (user) {
        return res.status(403).json("Email already taken")
    }
    user = await User.findOne({ userName })
    if (user) {
        return res.status(401).json("Username already taken")
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            userName,
            email,
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

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json("Invalid Email")
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(401).json("Invalid Password")
    }

    try {
        const accessToken = createAccessToken({ userId: user._id, userName: user.userName })
        res.status(200).json({ ...user._doc, accessToken })
    } catch (error) {
        res.status(500).json(error)
    }

})

//SEARCH USER THROUGH API CALL
router.get("/search", verifyToken, async (req, res) => {
    try {
        const { q } = req.query;
        const filterdSearch = {
            $or: [
                { email: { $regex: q, $options: "i" } },
                { userName: { $regex: q, $options: "i" } }
            ],
            _id: { $ne: req.user.userId } //excluding the currentuserId from the search
        }
        const searchUser = await User.find(filterdSearch).select("-password")
        res.status(200).json(searchUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE USER
router.put("/update/:userId", verifyToken, async (req, res) => {
    try {
        if (req.body.userName) {
            const user = await User.findOne({ userName: req.body.userName });
            if (user) {
                return res.status(401).json("Username already taken")
            }
        }
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true })
        const accessToken = jwt.sign({ userId: updatedUser._id, userName:updatedUser.userName }, process.env.JWT_SECRET)
        res.status(200).json({ ...updatedUser._doc, accessToken })
    } catch (error) {
        res.status(500).json(error)
    }

})



module.exports = router