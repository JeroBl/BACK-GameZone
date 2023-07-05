const { Users } = require("../db")
const bcrypt = require("bcryptjs")
//const { main } = require("../controllers/exampleMailer.js")
const { transporter } = require("../middlewares/nodemailer.js")

// ESTA FUNCION ESTA LISTA PARA SU USO

const updatePassword = async (req, res) => {
    try {
        const { id } = req.params
        const { currentPassword, newPassword, confirmNewPassword } = req.body

        // en esta funcion se utiliza tokens y rerefreshTokens

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "Las contraseñas no coinciden" });
        }else{
            const user = await Users.findByPk(id)

            if (!user) {
                res.status(404).json({ message: "Usuario no encontrado" })
            }else if (!user.password) {
                
                const salt = await bcrypt.genSalt(12);

                const encryptedPasswordGoogle = await bcrypt.hash(newPassword, salt);

                user.password = encryptedPasswordGoogle

                await transporter.sendMail({
                    from: 'carrizosamayito@gmail.com', // sender address // con variables de entorno
                    to: "fernandotejada1997@gmail.com", // list of receivers // datos de email de la db
                    subject: "correo de prueba ✔", // Subject line // asunto de que tipo de peticion se esta haciendo
                    //text: "", // plain text body
                    html: `
                    <b>Su contraseña fue actualizada de manera exitosa haga click para </b>
                    <a href="http://localhost:3000/login" > Iniciar Sesion </a>
                    `, // html body
                })

                await user.save()
                
                //await main()// deberia de haber parametros

                res.status(200).json({message : "contra actualizada"})

            }else{
                const isMatch = await bcrypt.compare(currentPassword, user.password)

                if (!isMatch) {
                    return res.status(400).json("La contraseña actual es incorrecta");
                }else{

                    const salt = await bcrypt.genSalt(12);

                    const encryptedPassword = await bcrypt.hash(newPassword, salt);

                    user.password = encryptedPassword;

                    await transporter.sendMail({
                        from: 'djkmecdgm65@gmail.com', // sender address // con variables de entorno
                        to: "djkmecdgm65@gmail.com", // list of receivers // datos de email de la db
                        subject: "correo de prueba ✔", // Subject line // asunto de que tipo de peticion se esta haciendo
                        //text: "", // plain text body
                        html: `
                        <b>Su contraseña fue actualizada de manera exitosa haga click para </b>
                        <a href="http://localhost:3000/login" > Iniciar Sesion </a>
                        `, // html body
                    })

                    await user.save();

                    //await main()// deberia de haber parametros

                    res.status(200).json({message : "contra actualizada"})
                }
            }
        }
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports = {
    updatePassword
}