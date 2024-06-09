import api from './apiConfig';

// Créer une nouvelle publication
export const createPublication = async (publicationData) => {

    const token = localStorage.getItem('userToken');

    try {
        const response = await api.post('/publication', publicationData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during creating publication:', error);
        throw error.response ? error.response.data : new Error('Something went wrong during creating publication');
    }
};