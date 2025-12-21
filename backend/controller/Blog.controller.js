const express = require("express")

const Blog = require('../models/Blog')

const postBlog = async(req,res)=>{
    const {title,content,tags} = req.body
    try {
        const blog = await Blog.create({
            title,content,tags,author:req.user._id

        })
        res.status(202).json({message:"Blog created successfully",blog})
    } catch (error) {
        res.status(500).json({message:"Failed to create blog",error:error.message})
    }
}
const getAllBlogs = async(req,res)=>{
    const blogs = await Blog.find().populate("author","name avatar").sort({createdAt:-1})
    return res.json(blogs)
}

module.exports = {postBlog,getAllBlogs}