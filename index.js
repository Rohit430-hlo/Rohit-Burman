require('dotenv').config()
const express = require('express')
const cors = require('cors')
const dbConnect = require('./config/dbConnect');
const router  = require('./routes/userRoute');
const PORT = process.env.PORT
const app = express();
app.use(cors())
app.use(express.json())

app.get('/' ,(req , res)=>{
    res.send("Hello")
})

console.log("dgfh",process.env.API_SCERET)
const fileUpload = require("express-fileupload");
app.use(fileUpload({ useTempFiles: true , tempFileDir : '/tmp/' }));

const cloudinary = require('./config/Coludinary')
cloudinary.cloudinaryConnect()

app.use('/' , router)


app.listen(PORT , ()=>{
    console.log(`App is running in Port ${PORT}`)
})

dbConnect()