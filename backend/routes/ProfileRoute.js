const express = require('express')
const router = express.Router()
const {profile,changePassword, edit} = require('../controller/Profile.controller')
const checkToken = require('../utils/CheckToken')
router.get('/', checkToken,profile)
router.patch('/changePassword',checkToken,changePassword)
router.put('/edit',checkToken,edit)
module.exports = router