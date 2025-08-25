const express = require('express')
const cors = require('cors')
const dbConnect = require('./config/dbConnect');
const router  = require('./routes/userRoute');
require('dotenv').config()
const PORT = process.env.PORT
const app = express();
app.use(cors())
app.use(express.json())

app.get('/' ,(req , res)=>{
    res.send("Hello")
})

app.use('/' , router)


app.listen(PORT , ()=>{
    console.log(`App is running in Port ${PORT}`)
})



dbConnect()