const express = require('express')
const router = express.Router()
const requirelogin = require('../middleware/requirelogin')
//to save the data to mongodb database we have to import mongoose
const mongoose = require('mongoose')
const Post = mongoose.model('post')

router.get('/allpost',requirelogin,(req,res) => {
    Post.find()
    .populate("postedby","_id name")
    .populate("comments.postedBy","_id name")
    .then(posts => {
        res.json({posts})
    })
    .catch(error => {
        res.status(422).json({error})
    })
})

router.post('/posts',requirelogin,(req,res) => {
    const{title,body,pic} = req.body
    if(!title || !body || !pic){
        return res.status(422).json({error: "Please fill the inputs"})
    }
     const post = new Post({
        title,
        body,
        photo:pic,
        postedby:req.user
    }) 
    post.save()
    .then(result => {
        res.json({post:result})
    })
    .catch(err => {
        console.log(err)
    })
})

//this will show all the posts by user who is logged in
router.get('/mypost',requirelogin,(req,res) => {
    console.log(req.user)
    Post.find({postedby:req.user._id})
    .populate('postedby', '_id name')
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err);
    })
})
router.put('/like',requirelogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postid,{
        $push:{likes:req.user._id} //$push is used to push record into array
    },{
        new:true
    }).populate('postedby','_id name')
    .exec((err,result) => {
        if(err){
            return res.send(err)
        }
        else{
            res.json(result)
        }
    })
})
router.put('/unlike',requirelogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postid,{
        $pull:{likes:req.user._id} // $pull is used to remove record from array
    },{
        new:true
    }).populate('postedby','_id name')
    .exec((err,result) => {
        if(err){
            return res.send(err)
        }
        else{
            res.json(result)
        }
    })
})
router.put('/comment',requirelogin,(req,res) => {
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postid,{
        $push:{comments:comment} //$push is used to push record into array
    },{
        new:true
    }).populate("comments.postedBy","_id name")
    .populate('postedby','_id name')
    .exec((err,result) => {
        if(err){
            return res.send(err)
        }
        else{
            res.json(result)
        }
    })
})
router.delete('/deletepost/:postId',requirelogin,(req,res) => {
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post) => {
        if(err || !post) {
            return res.status(422).res.json({error:err})
        }
        if(post.postedby._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result => {
                res.json(result)
            }).catch(err => {
                console.log(err)
            })
        }
    })
})
/* router.delete('/deletecomment/:commentId',requirelogin,(req,res) => {
    Post.findOne({_id:req.params.commentId})
    .populate("comments.postedBy","_id")
    .populate("postedBy","_id")
    .exec((err,post) => {
        if(err || !post) {
            return res.status(422).res.json({error:err})
        }
        if(post.comments.postedBy._id.toString() === req.user._id.toString()){
            comments.remove()
            .then(result => {
                res.json(result)
            }).catch(err => {
                console.log(err)
            })
        }
    })
}) */
module.exports = router