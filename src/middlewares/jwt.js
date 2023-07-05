const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env

// creamos tokens cuando el usuario se registra
// ojo este no es un middleware
function createAccessToken(payload) {

    return new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET, {expiresIn : "1m"}, (err, token) => {
            if (err) reject(err)
            resolve(token) 
        })
    })
}

module.exports = {
    createAccessToken
}