const mongoose = require('mongoose')
const { post } = require('../routes/auth')
const {ObjectId} = mongoose.Schema.Types
const Postschema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    postedby:{
        type:ObjectId,
        ref:"User" //building relation in mongodb
    }
})
mongoose.model("post", Postschema)