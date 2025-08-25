const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.signUp = async (req , res) => {
    try{
        const{name , email , password } = req.body;
        
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(409).json({
                success : false,
                message : "Email Already Exist"
            })
        }
        
        let hashPassword = await bcrypt.hash(password , 10)
        const user = await User.create({name , email , password:hashPassword })
        return res.status(200).json({
            success : true,
            data : user,  
            message : "User Created Successfully"
        })
    }  
    catch(err){
       res.status(500).json({
        success : false,
        message : err.message
       })
    }
}
