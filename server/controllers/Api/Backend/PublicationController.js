const { Publication } = require('../../../models');


module.exports = {

    async store(req, res) {

        // Récupération des données de la requête (content, image, user_id)
        const { content, image, user_id } = req.body;

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
            // Gestion des erreurs serveur
            return res.status(500).json({ error: "Erreur serveur" });
        }

    }
}