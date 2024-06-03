const { User } = require('../../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../../../config'); 

module.exports = {
    async store(req, res) {
        // Récupération des données de la requête
        const { email, password } = req.body;

        // Vérification des données de la requête
        if (!email || !password) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires" });
        }

        try {
            // Vérification si l'utilisateur existe déjà
            // Nous recherchons un utilisateur dans la base de données par son email.
            const user = await User.findOne({ where: { email } });

            // Si l'utilisateur n'existe pas, nous renvoyons une erreur.
            if (!user) {
                return res.status(400).json({ error: "Email ou mot de passe incorrect" });
            }

            // Vérification du mot de passe
            // Nous comparons le mot de passe fourni avec le mot de passe hashé stocké dans la base de données.
            const isPasswordValid = await bcrypt.compare(password, user.password);

            // Si le mot de passe est incorrect, nous renvoyons une erreur.
            if (!isPasswordValid) {
                return res.status(400).json({ error: "Email ou mot de passe incorrect" });
            }

            // Génération du token JWT
            // Si l'email et le mot de passe sont corrects, nous générons un token JWT pour l'utilisateur.
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

            // Définir le cookie avec le token JWT
            // Nous définissons le cookie avec le token JWT pour l'utilisateur.
            res.cookie('authToken', token, { httpOnly: true });

            // Réponse réussie avec les informations de l'utilisateur (sans le mot de passe)
            // Nous renvoyons une réponse avec les informations de l'utilisateur et le token JWT.
            return res.status(200).json({
                user: {
                    id: user.id,
                    email: user.email,
                    lastname: user.lastname,
                    firstname: user.firstname
                },
                token,
                message: "Connexion réussie",
            });
        } catch (error) {
            // Gestion des erreurs
            // Si une erreur se produit lors du processus, nous renvoyons une réponse d'erreur.
            return res.status(500).json({ error: "Erreur serveur" });
        }
    }
};
