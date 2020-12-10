const express = require('express')
const router = express.Router()
const requirelogin = require('../middleware/requirelogin')
//to save the data to mongodb database we have to import mongoose
const mongoose = require('mongoose')
const Post = mongoose.model('post')
const User = mongoose.model('User')

router.get('/user/:id',requirelogin,(req,res) => {
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedby:req.params.id})
        .populate('postedby','id name')
        .exec((err,post) => {
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,post})
        })

    }).catch(err => {
        return res.status(404).json({error:"User not Found"})
    })
})

router.put('/follow',requirelogin,(req,res) => {
    User.findByIdAndUpdate(req.body.followId,{
        $push : {followers:req.user._id} 
    },{
        new:true
    },(err,result) => {
        if(err){
           return  res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push : {following:req.body.followId} 

        },{new:true}).select("-password").then(result => {
            res.json({result})
        }).catch(err =>{
            return res.status(422).json({error:err})
        })
    })
})
router.put('/unfollow',requirelogin,(req,res) => {
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull : {followers:req.user._id} 
    },{
        new:true
    },(err,result) => {
        if(err){
           return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull : {following:req.body.unfollowId} 

        },{new:true}).select("-password").then(result => {
            res.json({result})
        }).catch(err =>{
            return res.status(422).json({error:err})
        })
    })
})

module.exports = router