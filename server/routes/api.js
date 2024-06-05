const express = require("express")
const router = express.Router()
const { auth, guest } = require('../middlewares/auth')

// // Importation des contrôleurs
const RegisterUserController = require("../controllers/Api/Auth/RegisterUserController")
const AuthenticatedSessionController = require("../controllers/Api/Auth/AuthenticatedSessionController")



// Routes d'API pour l'authentification
router.post("/register", guest, RegisterUserController.store)
router.post("/login", guest, AuthenticatedSessionController.store);
router.post("/logout", auth, AuthenticatedSessionController.logout);


// // Routes d'API pour les produits
// router.get('/products', auth, ProductController.index);
// router.post('/products', auth, ProductController.store);
// router.put('/products/:id', auth, ProductController.update);
// router.delete('/products/:id', auth, ProductController.delete);

module.exports = router;

