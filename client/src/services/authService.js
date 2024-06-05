import api from './apiConfig';

// Inscrire un nouvel utilisateur
export const register = async (email, password, lastname, firstname) => {
    try {
        const response = await api.post('/register', { email, password, lastname, firstname });
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong');
    }
}

// Authentifier un utilisateur
export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });

        // Si le serveur renvoie un token, stocker le token dans localStorage
        if (response.data.token) {
            localStorage.setItem('userToken', response.data.token);  // Stocker le token dans localStorage
        }
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong');
    }
}

// Déconnecter un utilisateur
export const logout = async () => {
    try {
        const response = await api.post('/logout');
        localStorage.removeItem('userToken');  // Supprimer le token de localStorage
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong');
    }
}
