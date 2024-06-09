import api from './apiConfig';

// Créer une nouvelle publication
export const createPublication = async (publicationData) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await api.post('/publication', publicationData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong during creating publication');
    }
}