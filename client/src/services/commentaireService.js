import api from './apiConfig';

export const createCommentaire = async (commentaireData) => {
    const token = localStorage.getItem('userToken');

    try {
        const response = await api.post('/commentaire', commentaireData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Erreur lors de la création du commentaire:', error);
        throw error.response ? error.response.data : new Error('Quelque chose s\'est mal passé lors de la création du commentaire');
    }
}

export const getCommentaires = async (publicationId) => {
    const token = localStorage.getItem('userToken');

    try {
        const response = await api.get(`/commentaires/${publicationId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
        throw error.response ? error.response.data : new Error('Quelque chose s\'est mal passé lors de la récupération des commentaires');
    }
}
