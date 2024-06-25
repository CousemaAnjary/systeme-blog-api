const { Commentaire, User } = require('../../../models')

module.exports = {
    async store(req, res) {
        const { user_id, publication_id, content } = req.body

        if (!user_id || !publication_id || !content) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires" })
        }

        try {
            const commentaire = await Commentaire.create({
                user_id,
                publication_id,
                content
            })

            return res.status(201).json({
                commentaire: {
                    id: commentaire.id,
                    user_id: commentaire.user_id,
                    publication_id: commentaire.publication_id,
                    content: commentaire.content,
                },
                message: "Commentaire créé avec succès"
            })
        } catch (error) {
            console.error('Erreur lors de la création du commentaire:', error)
            return res.status(500).json({ error: "Erreur serveur" })
        }
    },

    async getByPublication(req, res) {
        const { publication_id } = req.params

        try {
            const commentaires = await Commentaire.findAll({
                where: { publication_id },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['firstname', 'lastname', 'image']
                    }
                ],
                order: [['createdAt', 'ASC']]
            })

            return res.status(200).json({ commentaires })
        } catch (error) {
            console.error('Erreur lors de la récupération des commentaires:', error)
            return res.status(500).json({ error: "Erreur serveur" })
        }
    }
}
