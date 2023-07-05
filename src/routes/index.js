const { Router } = require('express');
const  saveGames = require("../controllers/saveGames")
const {nameGames} = require("../controllers/nameGames")
const {allGames} = require("../controllers/allGames")
const {allGamesAdmin} = require("../controllers/allGamesAdmin")
const {searchId} = require("../controllers/searchId")
const {platformGames} = require("../controllers/platformGames")
const {languagesGames} = require("../controllers/languagueGames")
const {categoriesGames} = require("../controllers/categoriesGames")
const {developersGames} = require("../controllers/developersGames")
const {genresGames} = require("../controllers/genresGames")
const {reviewsDemo} = require("../controllers/reviewsDemo")
const comingSoon = require('../controllers/comingSoon')
const specials = require('../controllers/specials')
const topSellers = require('../controllers/topSellers')
const newReleases = require('../controllers/newReleases')
const { createAccount } = require("../controllers/createAccount.js")
const { logIn } = require("../controllers/logIn.js")
const { cerrarSesion } = require("../controllers/logout.js")
const { profileUser } = require("../controllers/profile.js")
//const { validateToken } = require("../middlewares/validateToken.js")
const { upload, uploadPhoto } = require('../controllers/uploadPhoto');
const { isAdmin } = require("../middlewares/auth.js")
const { getAllGames, getGame, createGames, deleteGame, updateGame, banGame, reviewGames } = require('../controllers/games.controllers');
const { getAllUsers, getUser, createUser, deleteUser, updateUser, banUser, gamesUser } = require('../controllers/users.controllers');
const {cancelOrder, createOrder, captureOrder, priceFree} = require('../controllers/paypalControllers')
const { createReview, updateReview, deleteReview } = require("../controllers/reviews");
const { updatePassword } = require("../controllers/updatePassword")
//const { main } = require("../controllers/exampleMailer.js")
const { forgotPassword, verifyUrl, resetPassword } = require("../controllers/forgotPassword")
const {firebaseUser} = require("../controllers/googleFirebase")



const router = Router();

router.post ("/firebaseGoogle", firebaseUser)
//Free
router.post('/freeOrder', (req, res) => {
    priceFree(req, res)
})

router.get("/reviewsDemo/:id", (req, res) => {
    reviewsDemo(req,res);
});

router.get("/back/", (req, res) => {
    saveGames(req, res);
})

router.get("/allGames", (req, res) => {
    allGames(req, res);
})

router.get("/allGamesAdmin", (req, res) => {
    allGamesAdmin(req, res)
})

router.get("/nameGames", (req, res) => {
    nameGames(req, res);
})

router.get("/search/:id", (req, res) => {
    searchId(req, res);
})

router.get("/platformGames", (req, res) => {
    platformGames(req, res);
})

router.get("/languagesGames", (req, res) => {
    languagesGames(req, res);
})

router.get("/categoriesGames", (req, res) => {
    categoriesGames(req, res);
})

router.get("/developersGames", (req, res) => {
    developersGames(req, res);
})

router.get("/genresGames", (req, res) => {
    genresGames(req, res);
})

router.get('/coming', (req, res) => {
    comingSoon(req, res)
})

router.get('/specials', (req,res) => {
    specials(req, res)
})

router.get('/sellers', (req,res) => {
    topSellers(req, res)
})

router.get('/releases', (req,res) => {
    newReleases(req, res)
})

router.get("/mensaje", (req, res) => {
    res.send("hola mundo")
})

router.post('/upload', upload.single('file') ,(req, res) => {
    uploadPhoto(req, res)
})

//Paypal
//Crea una 'orden de pago'
router.post('/createOrder', (req, res) => {
    createOrder(req, res)
})
//El usuario acepta realizar el pago
router.get('/captureOrder', (req, res) => {
    captureOrder(req, res)
})
//Cancelar orden
router.get('/cancelOrder', (req, res) => {
    cancelOrder(req, res)
})

//
//
//router.get("/recipes/:idRecipe", (req, res) => {
//    getRecipesId(req, res)
//})
//
//
//router.get("/recipesName", (req, res) => {
//    getRecipesName(req, res);
//})
//
//
//router.post("/recipes", (req, res) => {
//    postRecipes(req, res);
//})
//
//
//router.get("/diets", (req, res) => {
//    getDiets(req, res);
//})

// Rutas de Registro de Usuarios
router.post("/crearCuenta", createAccount)
router.post("/iniciarSesion", logIn)
router.post("/cerrarSesion", cerrarSesion)

// Ruta del perfil del Usuario (esto es solo un ejemplo, se encarga Cristian)
// esto sera como una ruta protegida
router.get("/profile/:id", profileUser);//validateToken

// RUTAS USUARIOS admin*
// Ruta para tarer todos los usuario admin (borrado lógico)
router.get('/users', getAllUsers);
// Ruta para tarer un usuario por ID admin (borrado lógico)
router.get('/users/id/:id', getUser);
// Ruta para tarer un usuario por name admin (borrado lógico)
router.get('/users/name', getUser);
// Ruta para crear un usuario (borrado lógico)
router.post('/users', createUser);
// Ruta para eliminar un usuario por id o name admin (borrado lógico)
router.delete('/users/:id', deleteUser);
// Ruta para actualizar datos de un usuario por ID admin (borrado lógico)
router.put('/users/:id', upload.single('file'), updateUser);
// Ruta para banear un usuario por ID admin (borrado lógico)
router.put('/users/:userId/ban', banUser);

// RUTA GAMES admin*
// Ruta para tarer todos los Games admin(borrado lógico)
router.get('/games', getAllGames);
// Ruta para tarer un Game admin (borrado lógico)
router.get('/games/:id', getGame);
// Ruta para crear un Game (borrado lógico)
//router.post('/games', createGames);
router.post('/games',isAdmin, createGames);
// Ruta para eliminar un Games por id (borrado lógico)
router.delete('/games/:id', deleteGame);
// Ruta para actualizar datos un Game admin (borrado lógico)
router.put('/games/:id', updateGame);
// Ruta para banear un Game admin (borrado lógico)
router.put('/games/:gamesId/ban', banGame);



// Ruta para tarer todos los usuario (borrado lógico)
// RUTAS USUARIOS admin*
// Ruta para tarer todos los usuario admin (borrado lógico)
router.get('/users', getAllUsers);
// Ruta para tarer un usuario por ID admin (borrado lógico)
router.get('/users/id/:id', getUser);
// Ruta para tarer un usuario por name admin (borrado lógico)
router.get('/users/name', getUser);
// Ruta para crear un usuario (borrado lógico)
router.post('/users', createUser);
// Ruta para eliminar un usuario por id o name admin (borrado lógico)
router.delete('/users/:id', deleteUser);
// Ruta para actualizar datos de un usuario por ID admin (borrado lógico)
router.put('/users/:id', upload.single('file'), updateUser);
// Ruta para banear un usuario por ID admin (borrado lógico)
router.put('/users/:userId/ban', banUser);
//

// RUTA GAMES admin*
// Ruta para tarer todos los Games admin(borrado lógico)
router.get('/games', getAllGames);
// Ruta para tarer un Game admin (borrado lógico)
router.get('/games/:id', getGame);
// Ruta para crear un Game admin (borrado lógico)
router.post('/games',isAdmin,   createGames); //requireSignIn, ,
// Ruta para eliminar un Games por id admin(borrado lógico)
router.delete('/games/:id', deleteGame);
// Ruta para actualizar datos un Game admin (borrado lógico)
router.put('/games/:id', updateGame);
// Ruta para banear un Game admin (borrado lógico)
router.put('/games/:gamesId/ban', banGame);

// Ruta para crear una review
router.post('/user/review', createReview );
//Ruta para editar una review
router.put('/user/review', updateReview );
//Ruta para traer los juegos que ha comprado un usuario
router.get('/user/games', gamesUser)
//traer los reviews de un juego
router.get('/game/reviews', reviewGames)
//Borrar review
router.delete('/user/deleteReview/:id', deleteReview)

router.put("/updatePassword/:id", updatePassword)// esta es para actualizar contraseñas

// Recuperar cuenta del usuario

router.post("/forgot-password", forgotPassword)// primero envio un dato (email)
router.get("/verify-url/:id/:token", verifyUrl)
router.put("/reset-password/:id/:token", resetPassword)

module.exports = router;
