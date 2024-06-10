const { Publication, User } = require('../../../models');

module.exports = {
    async store(req, res) {
        const { title, content, category, user_id } = req.body;
        const image = req.file ? req.file.path : null;

        if (!content || !user_id) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires" });
        }

        try {
            const publication = await Publication.create({
                content,
                image,
                user_id,
                title,
                category
            });

            return res.status(201).json({
                publication: {
                    id: publication.id,
                    content: publication.content,
                    image: publication.image,
                    title: publication.title,
                    category: publication.category,
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
    },

    async show(req, res) {
        const { id } = req.params;

        try {
            const publication = await Publication.findOne({
                where: { id },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['firstname', 'image']
                    }
                ]
            });

            if (!publication) {
                return res.status(404).json({ error: "Publication non trouvée" });
            }

            return res.status(200).json({ publication });
        } catch (error) {
            console.error('Erreur lors de la récupération de la publication:', error);
            return res.status(500).json({ error: "Erreur serveur" });
        }
    }
};
