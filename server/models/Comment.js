const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
 
const Commentschema = mongoose.Schema({
    user_id:{
        type:ObjectId,
        ref:"User"
    },
    comment:{
        type:String,
        required:true
    }

})
mongoose.model("Comment",Commentschema)