import api from './apiConfig'

export const toggleLike = async (dataLike) => {
    try {
        // Appel à l'API pour gérer le like
        const response = await api.post('/like', dataLike)
        return response.data

    } catch (error) {
        console.error('Erreur lors de la gestion du like:', error);
    }
};
