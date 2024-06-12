const { User } = require('../../../models');

module.exports = {
    async store(req, res) {
        // Récupération des données de la requête
        const { email, password, lastname, firstname } = req.body;

        // Vérification de la présence de l'email, du mot de passe, du nom et du prénom
        if (!email || !password || !lastname || !firstname) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires" });
        }

        // Vérification si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email déjà utilisé" });
        }

        try {
            // Création de l'utilisateur
            const user = new User({
                email,
                password,
                lastname,
                firstname
            });

            // Sauvegarde de l'utilisateur dans la base de données
            await user.save();

            // Réponse réussie avec les informations de l'utilisateur (sans le mot de passe)
            return res.status(201).json({
                user: {
                    id: user.id,
                    email: user.email,
                    lastname: user.lastname,
                    firstname: user.firstname
                },
                message: "Utilisateur créé avec succès",
            });
        } catch (error) {
            // Gestion des erreurs de sauvegarde
            return res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
        }
    }
};