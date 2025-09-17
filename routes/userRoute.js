const express = require('express')
const { login, signUp } = require('../controller/userController')
const { auth } = require('../middleware/userMiddleware')
const { fileUpload } = require('../controller/fileController')

const router = express.Router()

router.post('/login' , login)
router.post('/signUp' , signUp)

router.get('/test' , auth , (req , res)=>{
    res.json({
        message : "Token Matched"
    })
})

router.post('/upload',auth , fileUpload)


module.exports = router