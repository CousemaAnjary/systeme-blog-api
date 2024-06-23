const { Reaction } = require('../../../models');

module.exports = {
    async like(req, res) {
        const { user_id, publication_id } = req.body

        try {
            // Vérifiez si l'utilisateur a déjà aimé cette publication
            const existingLike = await Reaction.findOne({
                where: {
                    user_id: user_id,
                    publication_id: publication_id,
                    type: 'like'
                }
            });

            if (existingLike) {
                // Si l'utilisateur a déjà aimé, retirez le like
                await existingLike.destroy();
                return res.status(200).json({ message: 'Like retiré avec succès', liked: false })
            } else {
                // Sinon, ajoutez un nouveau like
                await Reaction.create({
                    user_id: user_id,
                    publication_id: publication_id,
                    type: 'like'
                });
                return res.status(201).json({ message: 'Like ajouté avec succès', liked: true })
            }
        } catch (error) {
            console.error('Erreur lors de la gestion du like:', error)
            return res.status(500).json({ error: 'Erreur serveur' })
        }
    }
};
