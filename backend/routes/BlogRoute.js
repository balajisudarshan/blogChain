const express = require('express')
const {postBlog,getAllBlogs,getUserBlog,viewBlog} = require('../controller/Blog.controller')
const checkToken = require('../utils/CheckToken')
const router = express.Router()

router.post("/",checkToken,postBlog)
router.get("/",checkToken,getAllBlogs)
router.get("/my",checkToken,getUserBlog)
router.get('/viewblog/:id',checkToken,viewBlog)
router.get("/user/:userId",getUserBlog)

module.exports = router