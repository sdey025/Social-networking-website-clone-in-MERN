const express = require('express')
const router = express.Router()
//to save the data to mongodb database we have to import mongoose
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requirelogin = require('../middleware/requirelogin')
router.get('/protected',requirelogin /* passing middlewire */,(req, res) => {
    res.send("hello user !!!")
})

router.post('/signup',(req,res) => {
        const {name,email,password} = req.body
        if(!email || !password || !name ){
            return res.status(422).json({error: "Please add all fields"})
        }
        User.findOne({email:email})
            .then((SavedUser)=>{
                if (SavedUser){
                    return res.status(422).json({error: "Email ALready Exist"})
                }
                bcrypt.hash(password,12)
                .then(hashedpassword =>{
                    const user = new User({
                        name,
                        email,
                        password:hashedpassword
                    })
                    user.save()
                        .then(user => {
                            res.json({user:"Data Saved Successfuly"})
                        })
                        .catch(err => {
                            res.json({err})
                        })
                })

    })
            .catch(err =>{
                alert('some error occoured')
            })
})

router.post('/signin',(req,res) => {
    const{email, password} = req.body
    if(!email || !password){
        res.status(422).json({error:"Please fill details"})
    }
    User.findOne({email:email})
    .then(SavedUser => {
        if(!SavedUser){
            res.status(422).json({error: "Invalid Email or Password"})
        }
        bcrypt.compare(password,SavedUser.password)
        .then(doMatch => {
            if(doMatch){
                const token = jwt.sign({_id:SavedUser._id},JWT_SECRET)
                const {_id,name,email} = SavedUser
                res.json({token,user:{_id,name,email}})
            }
            else{
                res.status(422).json({error:"invalid email and password"})
            }

        })
        .catch(err => {
            res.json({err})
        })
    })
})

module.exports = router