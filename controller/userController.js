const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.signUp = async (req , res) => {
    try{
        const{name , email , password } = req.body;

        if(!name || !email || !password){
            return res.status(403).json({
                message : 'All Fields are requried'
            })
        }
        
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

exports.login = async (req , res) => {
    try{
        const{email , password} = req.body;

    if(!email || !password){
            return res.status(403).json({
                message : 'All Fields are requried'
            })
    }

      const user = await User.findOne({email})
        if(!user){
            return res.status(409).json({
                success : false,
                message : "Email is Not Registered"
            })
        }

        const isMatched = await bcrypt.compare(password , user.password)
        if(!isMatched){
            return res.status(401).json({
                message : 'Incorrect Password'
            })
        }

        const payload ={
            name :user.name,
            email :user.email
        }
        const token = jwt.sign(payload , process.env.Secret , {expiresIn : '15h'})

        res.status(200).json({
            success : true,
            message : "User is Logged INN ",
            token
        })
        

    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }


}
