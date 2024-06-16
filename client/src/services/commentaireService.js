import api from './apiConfig';

export const createCommentaire = async (dataCommentaire) => {
    try {
        // Appel à l'API pour créer un nouveau commentaire
        const response = await api.post('/commentaire', dataCommentaire)
        return response.data // Retourner les données de la réponse de l'API
    }
    catch (error) {
        console.error('Erreur lors de la création du commentaire:', error)
    }
}

export const getCommentaires = async (id) => {
    try {
        const response = await api.get(`/commentaires/${id}`)
        return response.data.commentaires
    }
    catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
        throw error.response ? error.response.data : new Error('Quelque chose s\'est mal passé lors de la récupération des commentaires');
    }
}
