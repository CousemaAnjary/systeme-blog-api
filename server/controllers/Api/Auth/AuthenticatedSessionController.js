const { User } = require('../../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../../config');

module.exports = {
    // Fonction asynchrone pour gérer la connexion des utilisateurs
    async store(req, res) {
        // Récupération des données de la requête (email et mot de passe)
        const { email, password } = req.body;

        // Vérification de la présence de l'email et du mot de passe
        if (!email || !password) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires" });
        }

        try {
            // Recherche d'un utilisateur par email
            const user = await User.findOne({ where: { email } });

            // Si aucun utilisateur n'est trouvé, renvoyer une erreur
            if (!user) {
                return res.status(400).json({ error: "Email ou mot de passe incorrect" });
            }

            // Vérification du mot de passe avec bcrypt
            const isPasswordValid = await bcrypt.compare(password, user.password);

            // Si le mot de passe est invalide, renvoyer une erreur
            if (!isPasswordValid) {
                return res.status(400).json({ error: "Email ou mot de passe incorrect" });
            }

            // Génération d'un token JWT
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

            // Renvoi d'une réponse réussie avec les informations de l'utilisateur et le token
            return res.status(200).json({
                user: {
                    id: user.id,
                    email: user.email,
                    lastname: user.lastname,
                    firstname: user.firstname
                },
                token, // Token JWT à utiliser pour les requêtes authentifiées
                message: "Connexion réussie",
            });
        } catch (error) {
            // Gestion des erreurs serveur
            return res.status(500).json({ error: "Erreur serveur" });
        }
    },

    // Fonction asynchrone pour gérer la déconnexion des utilisateurs
    async logout(req, res) {
        // Renvoyer un message de déconnexion réussie
        return res.status(200).json({ message: "Déconnexion réussie" });
    }
};
