const mongoose = require('mongoose')
require('dotenv').config()

const dbConnect = (req , res) =>{
    try{
        mongoose.connect(process.env.DATABASE_URL)
        .then(()=>{
            console.log("DataBase is Connected Successfully")
        })
    }
    catch(err){
        console.log("There is Error in Connection")
    }
}

module.exports = dbConnect