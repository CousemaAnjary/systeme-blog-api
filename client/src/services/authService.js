import api from './apiConfig';

// Inscrire un nouvel utilisateur
export const register = async (email, password, lastname, firstname) => {
    try {
        const response = await api.post('/register', { email, password, lastname, firstname });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong during registration');
    }
}

// Authentifier un utilisateur
export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });

        // Si le serveur renvoie un token, stocker le token dans localStorage
        if (response.data.token) {
            localStorage.setItem('userToken', response.data.token);  // Stocker le token dans localStorage
            localStorage.setItem('firstname', response.data.user.firstname); // Stocker le prénom de l'utilisateur
            localStorage.setItem('lastname', response.data.user.lastname);  // Stocker le nom de l'utilisateur
            localStorage.setItem('email', response.data.user.email);  // Stocker l'email de l'utilisateur
        }
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong during login');
    }
}

// Mettre à jour les informations de l'utilisateur  
export const updateUser = async (userData) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await api.put('/updateProfile', userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong during updating profile');
    }
}

export const updateUserPhoto = async (formData) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await api.post('/update-profile-photo', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong during updating profile photo');
    }
};

// Déconnecter un utilisateur
export const logout = async () => {
    try {
        const response = await api.post('/logout');
        localStorage.removeItem('userToken');  // Supprimer le token de localStorage
        localStorage.removeItem('firstname');  // Supprimer le prénom de localStorage
        localStorage.removeItem('lastname');  // Supprimer le nom de localStorage
        localStorage.removeItem('email');  // Supprimer l'email de localStorage
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong during logout');
    }
}

