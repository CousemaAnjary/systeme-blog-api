const { User } = require('../../../models');

module.exports = {
    async update(req, res) {
        // Récupérer l'ID de l'utilisateur depuis le token d'authentification
        const userId = req.user.id;

        // Récupérer les nouvelles données utilisateur depuis le corps de la requête
        const { firstName, lastName, email } = req.body;

        console.log('Données reçues pour la mise à jour :', req.body);

        try {
            // Vérifier si l'utilisateur existe dans la base de données
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            // Mettre à jour les informations de l'utilisateur
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.email = email || user.email;

            // Sauvegarder les modifications dans la base de données
            await user.save();

            console.log('Utilisateur mis à jour :', user);

            // Répondre avec les nouvelles informations de l'utilisateur
            return res.status(200).json({
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                },
                message: 'Informations utilisateur mises à jour avec succès'
            });
        } catch (error) {
            // Gérer les erreurs et envoyer une réponse appropriée
            console.error('Erreur lors de la mise à jour des informations utilisateur:', error);
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }
}
