import api from './apiConfig';

// Inscrire un nouvel utilisateur.
export const register = async (email, password, lastname, firstname) => {
    try {
        // Envoi de la requête à l'API.
        const response = await api.post('/register', { email, password, lastname, firstname });
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong');
    }
}

// Authentifier un utilisateur.
export const login = async (email, password) => {
    try {
        // Envoi de la requête à l'API.
        const response = await api.post('/login', { email, password });
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong');
    }
}

// Déconnecter un utilisateur.

export const logout = async () => {
    try {
        // Envoi de la requête à l'API.
        const response = await api.post('/logout');
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong');
    }
}

// Route protégée pour les utilisateurs authentifiés.
export const protectedRoute = async () => {
    try {
        // Envoi de la requête à l'API.
        const response = await api.get('/protected');
        return response.status === 200;

    } catch (err) {
        return false;
    }
}