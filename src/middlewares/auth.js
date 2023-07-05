const jwt = require('jsonwebtoken');
require("dotenv").config()
const { JWT_SECRET } = process.env
// autentificacion para saber si el user es Admin o no (implementando proceso)
const isAdmin = (req, res, next) => {
    const token = req.cookies.token
    console.log(token);
    if (!token) {
      res.status(401).json({ message: "autorizacion denegada, no existe un token valido" })
    } else {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
              res.status(403).json({ message: "token invalido" })
            } else {
                if (user.role === 'admin') {
                  next();
                }else {
                  res.status(403).json({ message: 'Acceso denegado' });
                }
            }
})
}
}
module.exports = {isAdmin}
