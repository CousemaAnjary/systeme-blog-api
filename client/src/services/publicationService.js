import api from './apiConfig';

export const createPublication = async (dataPublication) => {
    const token = localStorage.getItem('userToken');

    try {
        const response = await api.post('/publication', dataPublication, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during creating publication:', error);
        throw error.response ? error.response.data : new Error('Something went wrong during creating publication');
    }
}

export const getPublications = async () => {
    try {
        // Récupérer les publications depuis l'API
        const response = await api.get('/publications')
        return response.data.publications // Retourner les publications de la réponse de l'API

    } catch (error) {
        console.error('Erreur lors de l\'obtention des publications :', error)
    }
}

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

export const getUserPublications = async () => {
    const token = localStorage.getItem('userToken');
    try {
        const response = await api.get('/userPublications', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des publications de l\'utilisateur:', error);
        throw error;
    }
};



export const deletePublication = async (id) => {
    const token = localStorage.getItem('userToken');
    try {
        const response = await api.delete(`/publication/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression de la publication:', error);
        throw error;
    }
};

export const searchPublications = async (query) => {
    const token = localStorage.getItem('userToken');

    try {
        const response = await api.post('/search', { query }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        throw error.response ? error.response.data : new Error('Quelque chose s\'est mal passé lors de la recherche');
    }
};