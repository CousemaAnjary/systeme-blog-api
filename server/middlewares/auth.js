const jwt = require('jsonwebtoken')
const { secretKey } = require('../config')
const { User } = require('../models')

// Middleware pour vérifier si l'utilisateur est authentifié
const auth = async (req, res, next) => {
    // Récupérer le token JWT depuis les en-têtes d'autorisation
    const token = req.headers.authorization?.split(' ')[1] // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Pas de token, autorisation refusée' })
    }

    try {
        const decoded = jwt.verify(token, secretKey); // Vérifier le token JWT
        const user = await User.findByPk(decoded.userId); // Trouver l'utilisateur par ID

        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé, autorisation refusée" })
        }

        req.user = user; // Stocker les informations de l'utilisateur dans la requête
        next(); // Continuer si l'utilisateur est connecté
    } catch (err) {
        res.status(401).json({ message: "Le token n'est pas valide" })
    }
};

// Middleware pour vérifier si l'utilisateur est un invité (non connecté)
const guest = (req, res, next) => {
    // Récupérer le token JWT depuis les en-têtes d'autorisation
    const token = req.headers.authorization?.split(' ')[1] // Bearer <token>

    if (token) {
        try {
            jwt.verify(token, secretKey); // Tenter de vérifier le token
            return res.status(400).json({ message: 'Déjà authentifié' })
        } catch (err) {
            // Si le token est invalide, on laisse passer
        }
    }

    next(); // Passer au middleware suivant si aucun token valide n'est trouvé
};

module.exports = { auth, guest }
