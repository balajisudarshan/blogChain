const express = require('express')
const router = express.Router()
const {sendConnection,manageConnection, getRequests,getConnections, suggestions,getProfile,getConnectionCount} = require('../controller/Connection.controller')
const checkToken = require('../utils/CheckToken')
router.get('/count',checkToken,getConnectionCount)
router.get('/count/:userId',checkToken,getConnectionCount)

router.post('/:status/:toId',checkToken,sendConnection)
router.post('/connections/:status/:fromId',checkToken,manageConnection)
router.get('/getRequests',checkToken,getRequests)
router.get('/getConnections',checkToken,getConnections)
router.get('/people/suggestions',checkToken,suggestions)
router.get('/:userId',checkToken,getProfile)

module.exports = router