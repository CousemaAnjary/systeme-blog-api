const { Publication, User, Reaction, Commentaire } = require('../../../models')
const { Op } = require('sequelize')

module.exports = {
    async store(req, res) {
        const { title, content, category, user_id } = req.body
        const image = req.file ? req.file.path : null;

        if (!content || !user_id) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires" })
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
            console.error('Erreur lors de la création de la publication:', error)
            return res.status(500).json({ error: "Erreur serveur" })
        }
    },

    async index(req, res) {
        const { user_id } = req.query
        try {
            const whereClause = user_id ? { user_id } : {}
            const publications = await Publication.findAll({
                where: whereClause,
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['firstname', 'lastname', 'image']
                    },
                    {
                        model: Reaction,
                        as: 'reactions',
                        attributes: ['type']
                    },
                    {
                        model: Commentaire,
                        as: 'commentaires',
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['firstname', 'lastname', 'image']
                            }
                        ]
                    }
                ],
                order: [['createdAt', 'DESC']]
            });

            const formattedPublications = publications.map(publication => {
                const likes = publication.reactions.filter(reaction => reaction.type === 'like').length
                const comments = publication.commentaires.length
                return {
                    ...publication.toJSON(),
                    likes,
                    comments
                };
            });

            return res.status(200).json({ publications: formattedPublications })
        } catch (error) {
            console.error('Erreur lors de la récupération des publications:', error)
            return res.status(500).json({ error: "Erreur serveur" });
        }
    },


    async getUserPublications(req, res) {
        const userId = req.user.id; // Use the authenticated user's ID
        try {
            const publications = await Publication.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['firstname', 'lastname', 'image']
                    },
                    {
                        model: Reaction,
                        as: 'reactions',
                        attributes: ['type']
                    },
                    {
                        model: Commentaire,
                        as: 'commentaires',
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['firstname', 'lastname', 'image']
                            }
                        ]
                    }
                ],
                order: [['createdAt', 'DESC']]
            });
    
            const formattedPublications = publications.map(publication => {
                const likes = publication.reactions.filter(reaction => reaction.type === 'like').length
                const comments = publication.commentaires.length;
                return {
                    ...publication.toJSON(),
                    likes,
                    comments
                };
            });
    
            return res.status(200).json({ publications: formattedPublications })
        } catch (error) {
            console.error('Erreur lors de la récupération des publications de l\'utilisateur:', error)
            return res.status(500).json({ error: "Erreur serveur" })
        }
    },

    async show(req, res) {
        const { id } = req.params;
        const userId = req.user.id;

        try {
            const publication = await Publication.findByPk(id, {
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['firstname', 'image']
                    }
                ]
            });

            if (!publication) {
                return res.status(404).json({ error: "Publication non trouvée" })
            }

            const likesCount = await Reaction.count({
                where: {
                    publication_id: id,
                    type: 'like'
                }
            });

            const userLiked = await Reaction.findOne({
                where: {
                    user_id: userId,
                    publication_id: id,
                    type: 'like'
                }
            });

            return res.status(200).json({
                publication: {
                    ...publication.toJSON(),
                    likes: likesCount,
                    liked: !!userLiked
                }
            });
        } catch (error) {
            console.error('Erreur lors de la récupération de la publication:', error)
            return res.status(500).json({ error: "Erreur serveur" })
        }
    },

    async search(req, res) {
        const { query } = req.body

        try {
            const publications = await Publication.findAll({
                where: {
                    category: {
                        [Op.like]: `%${query}%`
                    }
                },
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
            console.error('Erreur lors de la recherche des publications:', error)
            return res.status(500).json({ error: "Erreur serveur" })
        }
    },


};
