const { sendmail } = require('../services/email')
const cloudinary = require('cloudinary').v2
const File = require('../models/fileModel')


function isFileType(type , supportedType){
    return supportedType.includes(type)
}

const uploadFileToCloudinary = async (file , folder ) => {
    const options = {folder}
    return await cloudinary.uploader.upload(file.tempFilePath , options)
}



exports.fileUpload = async (req , res) => {
    try{
        const{name  , email} = req.body
        console.log(name , email)
        const file  = req.files.file

        const supportedType = ["png" , "jpg" , "jpeg"]
        const fileType = file.name.split('.')[1].toLowerCase()
        console.log("My file type : " ,fileType)


        if(!isFileType(fileType , supportedType)){
            return res.status(400).json({
                success : false,
                message : "File Format is not supported"
            })
        }
         
        const response = await uploadFileToCloudinary(file , "FileLB" );
        console.log("Res" , response)

        const fileData = await File.create({name , email , fileUrl:response.secure_url})
        sendmail(fileData , response.secure_url)
        console.log(response.secure_url)
        res.json({
            success : true,
            fileData,
            fileUrl : response.secure_url,
            message : "File Uploaded Successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}