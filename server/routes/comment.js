const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Comment = mongoose.model('Comment')
const requirelogin = require('../middleware/requirelogin')

router.post('/comment',requirelogin,(req,res) => {
    const {comment} = req.body
    if(!comment){
        res.status(422).json({error:'Dont leave the comment blank'})
    }
    const com = new Comment({
        user_id:req.user,
        comment
    })
    com.save()
    .then(result => {
        res.json({com:result})
    })
    .catch(error => {
        res.json({error})
    })
})
module.exports = router