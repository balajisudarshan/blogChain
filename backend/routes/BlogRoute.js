const express = require('express')
const {postBlog,getAllBlogs} = require('../controller/Blog.controller')
const auth = require('../utils/CheckToken')
const router = express.Router()

router.post("/",auth,postBlog)
router.get("/",getAllBlogs)

module.exports = router