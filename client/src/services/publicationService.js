import api from './apiConfig'

export const createPublication = async (dataPublication) => {
    try {
        // Appeler l'API pour créer une publication
        const response = await api.post('/publication', dataPublication)
        return response.data // Retourner les données de la réponse de l'API

    } catch (error) {
        console.error('Erreur lors de la création de la publication:', error)
    }
}

export const getPublications = async () => {
    try {
        // Appeler l'API pour récupérer les publications
        const response = await api.get('/publications')
        return response.data.publications // Retourner les données de la réponse de l'API

    } catch (error) {
        console.error('Erreur lors de l\'obtention des publications:', error)
    }
}

export const showPublication = async (id) => {
    try {
        // Appeler l'API pour voir une publication
        const response = await api.get(`/publication/${id}`)
        return response.data // Retourner les données de la réponse de l'API

    } catch (error) {
        console.error('Erreur lors de l\'obtention de la publication :', error)
    }

}

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