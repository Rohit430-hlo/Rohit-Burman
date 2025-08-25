const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const fileSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    fileUrl : {
        type : String,
    },
    email : {
        type : String
    },
})
module.exports = mongoose.model("File" , fileSchema)