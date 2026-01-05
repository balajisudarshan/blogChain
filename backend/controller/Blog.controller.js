const express = require("express")

const Blog = require('../models/Blog')
const Tag = require('../models/Tag')
const postBlog = async(req,res)=>{
    const {title,content,tags} = req.body
    try {
        const tag = [...new Set(tags.map(t=>t.toLowerCase().trim()))]

        await Tag.insertMany(tag.map(tag=>({name:tag})),{ordered:false})
        const blog = await Blog.create({
            title,content,tags:tag,author:req.user._id
        })
        res.status(202).json({message:"Blog created successfully",blog})
    } catch (error) {
        res.status(500).json({message:"Failed to create blog",error:error.message})
    }
}
const getAllBlogs = async(req,res)=>{
    const blogs = await Blog.find({author:{$ne:req.user._id}}).populate("author","name avatar").sort({createdAt:-1})
    return res.json(blogs)
}

const getSpecificUserBlog = async(req,res)=>{
    try {
        const userId = req.params.id;
        const blogs = await Blog.find({author:userId}).populate("author","name avatar").sort({createdAt:-1})

        return res.json({blogs})
    } catch (error) {
        
    }
}

const getUserBlog = async(req,res)=>{
    try {
        const userId = req.params.userId || req.user._id
        const blogs = await Blog.find({author:userId})
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
        console.log(error)
    }
}

const viewBlog = async(req,res)=>{
    try {
        const blogId = req.params.id
        const result = await Blog.findById(blogId).populate("author","name avatar")
        return res.json({result})
    } catch (error) {
        console.log(error)
    }
}
module.exports = {postBlog,getAllBlogs,getUserBlog,viewBlog}