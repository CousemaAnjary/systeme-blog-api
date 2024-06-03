import api from './apiConfig';

// Inscrire un nouvel utilisateur.
export const register = async (email, password, lastname, firstname) => {
    try {
        const response = await api.post('/register', { email, password, lastname, firstname });
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong');
    }
}

// Authentifier un utilisateur.
export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong');
    }
}