const {getNotification,getUnreadCount, markAsRead} = require('../controller/Notification.controller')
const checkToken = require('../utils/CheckToken')

const router = require('express').Router()


router.get('/',checkToken,getNotification)
router.get('/unreadCount',checkToken,getUnreadCount)
router.patch('/markRead',checkToken,markAsRead)
module.exports = router