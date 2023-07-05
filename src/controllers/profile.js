const { Users } = require("../db")

const profileUser = async (req, res) => {
    try {

        //res.send("este es el perfil del usuario")

        const {id} = req.params

        const dataProfile = await Users.findByPk(id)
        
        if (!dataProfile) {
            
            res.status(400).json({message : "Usuario no encontrado"})

        } else {

            res.status(200).json(
                {
                    name : dataProfile.name,
                    email : dataProfile.email,
                    user_name : dataProfile.user_name,
                    country : dataProfile.country
                }
            )
            
        }

        console.log(req.user, "esto esta en el perfil del usuario")
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports = {
    profileUser
}