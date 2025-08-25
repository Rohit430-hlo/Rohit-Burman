const cloudinary = require('cloudinary')

exports.cloudiConnect = ()=>{
    try{
        cloudinary.config({
            
        })
    }
    catch(err){
        console.log("Error in Clodinary Connection")
    }
}