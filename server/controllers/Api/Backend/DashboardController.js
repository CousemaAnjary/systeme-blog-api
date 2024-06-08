const { User } = require('../../../models');

module.exports = {
    async update(req, res) {
        const userId = req.user.id;
        const { firstname, lastname, email } = req.body;

        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            user.firstname = firstname || user.firstname;
            user.lastname = lastname || user.lastname;
            user.email = email || user.email;

            await user.save();

            return res.status(200).json({
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    image: user.image, // Inclure l'image de profil dans la réponse
                    coverPhoto: user.coverPhoto // Inclure la photo de couverture dans la réponse

                },
                message: 'Informations utilisateur mises à jour avec succès'
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour des informations utilisateur:', error);
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    },

    async updateProfilePhoto(req, res) {
        const userId = req.user.id;
        const photoPath = `uploads/${req.file.filename}`;

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
            console.error('Erreur lors de la mise à jour de la photo de profil:', error);
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    },

    // Nouvelle méthode pour mettre à jour la photo de couverture
    updateCoverPhoto: async (req, res) => {
        const userId = req.user.id;
        const coverPhotoPath = `uploads/${req.file.filename}`;

        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            user.coverPhoto = coverPhotoPath;

            await user.save();

            return res.status(200).json({
                user: {
                    id: user.id,
                    coverPhoto: user.coverPhoto
                },
                message: 'Photo de couverture mise à jour avec succès'
            });
        } catch (error) {
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }
}
