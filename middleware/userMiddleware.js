const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    try {
        console.log("Token is header  : ",req.headers["authorization"])
        const authHeader = req.headers["authorization"].replace("Bearer ", "")
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            });
        }
        
        const token = authHeader;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            });
        }
        
        try {
            const decoded = jwt.verify(token, process.env.Secret);
            req.user = decoded; 
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        next();
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
