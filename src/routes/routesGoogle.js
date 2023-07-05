const router = require("express").Router()
const passport = require("passport")
require("dotenv").config()
const { REDIRECT_URL_FRONT, REDIRECT_LOGOUT_FRONT } = process.env

require("../controllers/googleAuth.js")

router.get('/user', (req, res) => {
    if (req.user) {
        res.status(200).json(
             req.user
        );
    }else{
        res.status(403).json({error: true, message: 'Not Authorized'})
    }

    console.log(req.user, "esto es de la ruta user"); // Imprimir el usuario en la consola del servidor
    //res.json(req.user); // Enviar el usuario como respuesta JSON al cliente
});

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send("hubo un error")
        }
        //res.send("sesion cerrada")// deebe redirigir a otra ventana del front
        res.redirect(REDIRECT_LOGOUT_FRONT);
    })
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "An error occurred",
    });
})

router.get('/google',
    passport.authenticate('google', { scope: ["profile", 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login/failed', successRedirect : REDIRECT_URL_FRONT}),
    //function(req, res) {
    //  // Successful authentication, redirect home.
    //  const data = req.user
//
    //  console.log(data, "estos son los datos del usuario")
    //  //res.redirect(REDIRECT_URL_FRONT);
    //}
);


module.exports = router