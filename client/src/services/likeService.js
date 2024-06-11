import api from './apiConfig';

export const toggleLike = async (likeData) => {
    const token = localStorage.getItem('userToken');

    try {
        const response = await api.post('/like', likeData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la gestion du like:', error);
        throw error.response ? error.response.data : new Error('Quelque chose s\'est mal passé lors de la gestion du like');
    }
};
