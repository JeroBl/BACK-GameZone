//const jwt = require("jsonwebtoken")
//
//require("dotenv").config()
//
//const { JWT_SECRET } = process.env
//
//const validateToken = (req, res, next) => {
//    try {
//
//        const token = req.cookies.token
//
//        if (!token) {
//            res.status(401).json({message : "autorizacion denegada, no existe un token valido"})
//        }else {
//            jwt.verify(token, JWT_SECRET, (err, user) => {
//                if (err) {
//                    res.status(403).json({message : "token invalido"})
//                }
//
//                req.user = user
//                //console.log(user)
//                next()
//            })
//        }
//        
//    } catch (error) {
//        console.log(error)
//    }
//}
//
//module.exports = {
//    validateToken
//}
