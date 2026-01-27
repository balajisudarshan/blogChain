const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const ValidateFields = require('../utils/ValidateFields')
require('dotenv').config()
const registerUser = async (req, res) => {
    const { name, email, password, avatar, bio, skills } = req.body

    try {
        ValidateFields({ name, email, password })
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, password: hashedPassword, avatar, bio, skills })
        await newUser.save()
        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        ValidateFields({ email, password })
        console.log("BACKEND RECEIVED:", req.body)

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect Details" })
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET)
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: "none",
            secure: false
        })
        res.status(200).json({ user })

    } catch (error) {
        console.log("Login error:", error.message)
        return res.status(400).json({ message: error.message })

    }
}

const logout = async (req, res) => {
    try {
        res.cookie("token", null, { expire: new Date(Date.now()) });
        res.status(200).json({ message: "Logout Successfull" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
        console.log(error)
    }
}
module.exports = { registerUser, loginUser, logout }