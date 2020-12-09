const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors') 
const bodyParser = require('body-parser')
const PORT =  5000
//connecting mongodb 
const {MONGOURI} = require('./keys')
mongoose.connect(MONGOURI)
app.use(cors())
mongoose.connection.on('connected', () => {
    console.log("DATABASE CONNECTED !!!")
})
mongoose.connection.on('error', (err) => {
    console.log(`Error in connecting Database ${err}`)
})
app.use(bodyParser.json())
require('./models/User')
app.use(express.json())
app.use(require('./routes/auth'))

require('./models/Post')

app.use(require('./routes/posts'))
app.use(require('./routes/user'))

require('./models/Comment')
app.use(require('./routes/comment'))
//this is an example middlewire
/* const myMiddlewire = (req, res, next) => {
    console.log('Mai middlewire hu !!')
    next() */
/* } */
//to call the middlewire for all routes we write app.use()
/* app.use(myMiddlewire) */

/* app.get('/',(req,res) => { */
    //when we call middlewire it will display earlier than the get request
   /*  console.log("mai get request k taraf se hu !!")
    res.send(`Hello port ${PORT}`)
}) */
//if we want the middlewire for only /about
/* app.get('/about',myMiddlewire,(req,res) => {
    console.log('Mai about page se belong karta hu !!')
    res.send("i am from about page")
}) */

app.listen(PORT,() => console.log(`Server is Running on port no. ${PORT}`))