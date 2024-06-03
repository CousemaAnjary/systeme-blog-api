const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const { User } = require('../models');

//  Middleware pour vérifier si l'utilisateur est authentifié

const auth = async (req, res, next) => {
    const token = req.cookies.authToken; // Récupérer le token JWT depuis les cookies

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, secretKey); // Vérifier le token JWT
        const user = await User.findByPk(decoded.userId); // Trouver l'utilisateur par ID

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        req.user = user; // Stocker les informations de l'utilisateur dans la requête
        next(); // Continuer si l'utilisateur est connecté

    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }

}

// Middleware pour vérifier si l'utilisateur est un invité (non connecté)

const guest = (req, res, next) => {
    const token = req.cookies.authToken; // Récupérer le token JWT depuis les cookies

    if (token) {
        return res.status(401).json({ msg: 'You are already authenticated' });
    }

    next(); // Passer au middleware suivant
};

module.exports = { auth, guest };
