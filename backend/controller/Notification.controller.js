const Notification = require('../models/Notification')

const getNotification = async(req,res)=>{
    const userId = req.user._id;

    const notifications = await Notification.find({userId}).populate("fromId","name avatar").sort({createdAt:-1})

    res.json({notifications})
}
const getUnreadCount = async(req,res)=>{
    const userId = req.user._id;

    const count = await Notification.countDocuments({
        userId,
        isRead:false
    })

    res.json({count})
}

const markAsRead = async(req,res)=>{
    const userId = req.user._id

    await Notification.updateMany(
        {userId,isRead:false},
        {isRead:true}
    )
    res.json({message:"Notification marked as read"})
}
module.exports = {getNotification,getUnreadCount,markAsRead}