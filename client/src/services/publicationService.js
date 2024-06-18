import api from './apiConfig'

// Créer une nouvelle publication
export const createPublication = async (dataPublication) => {
    try {
        // Appel à l'API pour créer une nouvelle publication
        const response = await api.post('/publication', dataPublication, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data // Retourner les données de la réponse de l'API

    } catch (error) {
        console.error('Erreur lors de la création de la publication :', error)
    }
}

// Liste des publications
export const getPublications = async () => {
    try {
        // Appel à l'API pour obtenir les publications
        const response = await api.get('/publications')
        return response.data.publications // Retourner les publications de la réponse de l'API

    } catch (error) {
        console.error('Erreur lors de l\'obtention des publications :', error)
    }
}

// Obtenir une publication
export const getPublication = async (id) => {
    try {
        // Récupérer la publication depuis l'API
        const response = await api.get(`/publication/${id}`)
        return response.data.publication // Retourner les données de la réponse de l'API

    } catch (error) {
        console.error('Erreur lors de l\'obtention de la publication :', error)
    }
}

export const getUserPublications = async () => {
    try {
        // Appel à l'API pour obtenir les publications de l'utilisateur
        const response = await api.get('/userPublications')
        return response.data.publications // Retourner les données de la réponse de l'API

    } catch (error) {
        console.error('Erreur lors de la récupération des publications de l\'utilisateur:', error)
    }
}


export const searchPublications = async (query) => {
    try {
        // Appel à l'API pour rechercher des publications
        const response = await api.post('/search', { query })
        return response.data // Retourner les données de la réponse de l'API

    } catch (error) {
        console.error('Erreur lors de la recherche:', error)
    }
};