const { User } = require('../../../models');

module.exports = {
    async update(req, res) {
        const userId = req.user.id;
        const { firstname, lastname, email } = req.body;

        console.log('Données reçues pour la mise à jour :', req.body);

        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            user.firstname = firstname || user.firstname;
            user.lastname = lastname || user.lastname;
            user.email = email || user.email;

            await user.save();

            console.log('Utilisateur mis à jour :', user);

            return res.status(200).json({
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    image: user.image  // Ajoutez cette ligne pour inclure l'image dans la réponse
                },
                message: 'Informations utilisateur mises à jour avec succès'
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour des informations utilisateur:', error);
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    },

    updateProfilePhoto: async (req, res) => {
        const userId = req.user.id;
        const photoPath = `uploads/${req.file.filename}`;  // Stocker le chemin relatif de l'image

        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            user.image = photoPath;

            await user.save();

            return res.status(200).json({
                user: {
                    id: user.id,
                    image: user.image
                },
                message: 'Photo de profil mise à jour avec succès'
            });
        } catch (error) {
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }
}