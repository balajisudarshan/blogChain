const express = require('express')
const Connection = require('../models/Connection')
const User = require('../models/User')

const sendConnection = async (req, res) => {
  try {
    const { toId, status } = req.params
    const { _id } = req.user

    const allowedStatus = ['like', 'ignore']
    if (!allowedStatus.includes(status.toLowerCase())) {
      return res.json({ message: "Invalid request type" })
    }

    const existingConnection = await Connection.findOne({
      $or: [
        { fromId: _id, toId: toId },
        { fromId: toId, toId: _id }
      ]
    })

    console.log(`From id ${_id} To id ${toId}`)
    if(_id === toId){
      return res.json({message:"You cannot send connnection to yourself"})
    }
    if (existingConnection) {
      return res.json({ message: "Connection already present" })
    }

    const newConnection = new Connection({
      fromId: _id,
      toId,
      status: status.toLowerCase()
    })

    await newConnection.save()
    res.json({ message: "Request sent successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message })
  }
}


const manageConnection = async (req, res) => {
  try {
    const { fromId, status } = req.params
    const toId = req.user
    // const allowedConnections = ['accepted','rejected']
    const connection = await Connection.findOne({ fromId, toId, status: 'like' })

    if (!connection) {
      return res.status(404).json({ message: "Connection not found" })

    }

    connection.status = status
    await connection.save()

    res.status(202).json({ message: `Connection ${status}` })
  } catch (error) {
    return res.status(500).json({ message: "Error " + error.message })
  }
}

const getRequests = async (req, res) => {
  // let requestedUsers = []
  // console.log(req.user)
  const userId = req.user._id
  try {
    const connections = await Connection.find({ toId: userId }).populate("fromId", "name avatar bio skills")
    const filteredConnections = connections.filter(conn => conn.status === "like")


    return res.json({ filteredConnections })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getConnections = async (req, res) => {
  const userId = req.user._id
  try {
    const connections = await Connection.find({ $or:[{toId: userId},{fromId:userId}]}).populate("fromId toId", "name")
    const filteredConnections = connections.filter(conn => conn.status === "accepted")
    const otherIds = filteredConnections.map(conn=>conn.fromId.toString()===userId.toString()?conn.toId:conn.fromId)
    return res.status(200).json({otherIds})
  } catch (error) {
    res.status(500).json({message:error})
  }
}

const suggestions = async(req,res)=>{
  const userId = req.user._id;
  const avoidPeople = await Connection.find({
    $or:[
      {fromId:userId},
      {toId:userId}
    ]
  })
  // return res.json({avoidPeople})
  const avoidIds = [];
  for(const c of avoidPeople){
    avoidIds.push(c.fromId.toString())
    avoidIds.push(c.toId.toString())
  }

  const uniqueAvoid = [...new Set([...avoidIds, userId.toString()])];

  const people = await User.find({ _id: { $nin: uniqueAvoid } });
  return res.json({people})
}

const getProfile = async (req,res) => {

  try {
    const id = req.user.id
    const { userId } = req.params;
    // console.log(email)

    const user = await User.findById(userId).select('-password')
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

const getConnectionCount = async(req,res)=>{
  const userId = req.user._id || req.params.userId;

  try {
    const count = await Connection.countDocuments({
      status:'accepted',
      $or:[
        {fromId:userId},
        {toId:userId}
      ]
    })

    return res.status(200).json({count})
  } catch (error) {
    return res.staus(500).json({message:error.message})
  }
}
module.exports = { sendConnection, manageConnection, getRequests,getConnections,suggestions,getProfile,getConnectionCount }
