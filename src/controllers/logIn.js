const { Users } = require("../db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { createAccessToken } = require("../middlewares/jwt.js")

const logIn = async (req, res) => {
    try {

        const {emailLogin, passwordLogin} = req.body

        if (!emailLogin || !passwordLogin) {

            return res.status(400).json("validacion fallida!!")
            
        } else {

            const existingUser = await Users.findOne({
                where : {
                    email : emailLogin
                }
            })
            console.log("QQQQQQ", existingUser );
            
            if (!existingUser) {
                
                res.status(400).json({message : "El usuario no existe!!!"})
            }else{

                const comparePassword = await bcrypt.compare(passwordLogin, existingUser.password)

                if (!comparePassword) {
                    
                    res.status(401).json({message : "Contraseña Invalida"})

                } else {

                    const token = await createAccessToken({id : existingUser.id})

                    //falta crear tokens y cookies y tambien validar
                    // esto es solo de prueba
                    // res.cookie("token", token)*
                    
                    const login = res.status(200).json({
                        message : "Sesion Iniciada",
                        id : existingUser.id,
                        name : existingUser.name,
                        email : existingUser.email,
                        user_name : existingUser.user_name,
                        country : existingUser.country,
                        profileImage : existingUser.profileImage,
                        password : existingUser.password
                    })
                }
            }
        }

        //res.send("Hola mundo")
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports = {
    logIn
}