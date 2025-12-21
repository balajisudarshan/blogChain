const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')
require('dotenv').config()

const profile = async (req, res) => {

  try {
    const id = req.user.id
    const email = req.user.email
    console.log(email)

    const user = await User.findOne({ email }).select('-password')
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

const edit = async (req, res) => {
  const { name, skills, bio, gender, age, avatar } = req.body
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, skills, bio, gender, age, avatar },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}


const changePassword = async (req, res) => {
  const { oldPassword, newPassword, retypedPassword } = req.body
  const id = req.user.id
  const email = req.user.email

  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(404).json({ message: "User not found" })
    }
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isPasswordMatch) {
      res.status(401).json({ message: "Invalid Password" })
    }
    if (newPassword !== retypedPassword) {
      res.status(401).json({ message: "Passwords didnt match" })
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10)
    const isOldPassword = await bcrypt.compare(oldPassword, newHashedPassword)
    if (isOldPassword) {
      res.json(400).json({ message: "New password must not be equal to Old Password" })
    }
    user.password = newHashedPassword
    await user.save()
    res.status(201).json({ message: "Password Changed Successfully" })

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
    console.log(error)
  }

}



module.exports = { profile, changePassword, edit }
