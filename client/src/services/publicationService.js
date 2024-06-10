import api from './apiConfig';

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

export const getPublications = async () => {
    const token = localStorage.getItem('userToken');

    try {
        const response = await api.get('/publications', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during getting publications:', error);
        throw error.response ? error.response.data : new Error('Something went wrong during getting publications');
    }
};

export const getPublication = async (id) => {
    const token = localStorage.getItem('userToken');

    try {
        const response = await api.get(`/publication/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during getting publication:', error);
        throw error.response ? error.response.data : new Error('Something went wrong during getting publication');
    }
};
