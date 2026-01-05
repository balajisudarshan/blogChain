const router = require('express').Router()
const Tag = require('../models/Tag')
router.get('/',async(req,res)=>{
    const tags = await Tag.find().sort({name:1})
    return res.json({tags})
})

module.exports = router