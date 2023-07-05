const { Users } = require("../db")
const transporter = require('../middlewares/nodemailer')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { createAccessToken } = require("../middlewares/jwt.js")
const profileImage = 'https://res.cloudinary.com/dcebtiiih/image/upload/v1686950493/images/1686950487877.webp'
const express = require('express');
const router = express.Router();

require("dotenv").config()

const { JWT_SECRET, URL_INICIO } = process.env

const createAccount = async (req, res) => {
    try {

        const { email, password, name, user_name, country, confirmPassword} = req.body

        if (!email || password.length < 8 || !password || !name || !country || !user_name || user_name.length < 3 || user_name.length > 16) {
            
            res.status(400).json({message : "datos invalidos"})

        }else if (password !== confirmPassword) {

            res.status(400).json({ message: "Las contraseñas no coinciden" });

        }else{

            const existUer = await Users.findOne({
                where : {
                    email : email
                }
            })

            if (existUer) {

                res.status(400).json({message : "el usuario ya existe!!!"})

            }else{

                const salt = await bcrypt.genSalt(12)

                const cripto = await bcrypt.hash(password, salt)
    
                const createUser = await Users.create({
                    name,
                    email,
                    password : cripto,
                    user_name,
                    country,
                    profileImage,
                    confirmPassword,
                    ban: false
                })
    
                // esto se convierte en un middlewares
                // para validar el token tenemos que crear el login
                const token = await createAccessToken({id : createUser.id}) // esto podria se opcional
                //const token = jwt.sign({id : createUser.id}, JWT_SECRET, {expiresIn : "1d"})
                //console.log(token, " esto es el token")
    
                res.cookie("token", token)
                res.status(200).json({
                    message : "Usuario Creado"
                })
            }
        }

        
    await transporter.sendMail({
        from: '"Welcome to Our Platform" <carrizosamayito@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Welcome to Our Platform", // Subject line
        html:  `<h1>Welcome to Gamezone</h1>
                <p>Dear ${name},</p>
                <p>Welcome to our platform! We are thrilled to have you as a new member of our community.</p>
                <p>With our platform, you'll have access to a wide range of exciting features, games, and interactive experiences. Whether you're a casual player or a seasoned gamer, we have something for everyone.</p>
                <p>We encourage you to explore our platform, discover new games and enjoy the immersive world of gaming.</p>
                <p>If you have any questions, concerns, or need assistance, our support team is always ready to help. Feel free to reach out to us via mail at carrizosamayito@gmail.com</p>
                <p>Thank you for joining us! We hope you have an incredible experience and make lasting memories on our platform.</p>
                <p>Best regards,</p>
                <p>The Gamezone Team</p>`
        }
    )

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

//const redirectToHome = (req, res) => {
//    try {
//
//        console.log(URL_INICIO)
//
//        return res.redirect(URL_INICIO)
//        
//    }catch (error) {
//        res.status(500).json({message : error.message})
//    }
//}

module.exports = {
    createAccount
}