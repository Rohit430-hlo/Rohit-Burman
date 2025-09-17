const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const fileSchema = new mongoose.Schema({
 
    fileUrl : {
        type : String,
        require : true
    }
  
})
module.exports = mongoose.model("File" , fileSchema)