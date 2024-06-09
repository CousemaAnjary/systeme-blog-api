const { Publication, User } = require('../../../models');

module.exports = {
    async store(req, res) {
        const { content, user_id } = req.body;
        const image = req.file ? req.file.path : null;

        // Vérification de la présence de content et user_id
        if (!content || !user_id) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires" });
        }

        try {
            // Création d'une publication
            const publication = await Publication.create({
                content,
                image,
                user_id
            });

            // Renvoi d'une réponse réussie avec la publication créée
            return res.status(201).json({
                publication: {
                    id: publication.id,
                    content: publication.content,
                    image: publication.image,
                    user_id: publication.user_id
                },
                message: "Publication créée avec succès"
            });
        } catch (error) {
            console.error('Erreur lors de la création de la publication:', error);
            return res.status(500).json({ error: "Erreur serveur" });
        }
    },

    async index(req, res) {
        try {
            const publications = await Publication.findAll({
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['firstname', 'image']
                    }
                ],
                order: [['createdAt', 'DESC']]
            });
            return res.status(200).json({ publications });
        } catch (error) {
            console.error('Erreur lors de la récupération des publications:', error);
            return res.status(500).json({ error: "Erreur serveur" });
        }
    }
};
