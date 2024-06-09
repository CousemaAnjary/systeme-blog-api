const express = require("express")
const router = express.Router()
const { auth, guest } = require('../middlewares/auth')
const multer = require('multer');
const path = require('path');

// Importation des contrôleurs
const RegisterUserController = require("../controllers/Api/Auth/RegisterUserController")
const AuthenticatedSessionController = require("../controllers/Api/Auth/AuthenticatedSessionController")
const DashboardController = require("../controllers/Api/Backend/DashboardController")
const PublicationController = require("../controllers/Api/Backend/PublicationController")

// Configuration de multer pour le téléchargement de fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Routes d'API pour l'authentification
router.post("/register", guest, RegisterUserController.store)
router.post("/login", guest, AuthenticatedSessionController.store);
router.post("/logout", auth, AuthenticatedSessionController.logout);

// Routes d'API pour dashboard
router.put("/updateProfile", auth, DashboardController.update);
router.post("/updateProfilePhoto", auth, upload.single('photo'), DashboardController.updateProfilePhoto);
router.post("/updateCoverPhoto", auth, upload.single('coverPhoto'), DashboardController.updateCoverPhoto);

// Routes d'API pour les publications
// router.get("/publications", auth, DashboardController.index);
 router.post("/publication", auth, PublicationController.store);


module.exports = router;
