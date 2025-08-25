const express = require('express')
const app = express();
require('dotenv').config()
const PORT = process.env.PORT

const dbConnect = require('./config/dbConnect')
dbConnect()


app.listen(()=>{
    console.log(`App is running in Port ${PORT}`)
})