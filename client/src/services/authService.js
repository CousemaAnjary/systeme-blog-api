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

        if (response.data.token) {
            localStorage.setItem('userToken', response.data.token);  // Stocker le token dans localStorage
            localStorage.setItem('firstname', response.data.user.firstname); // Stocker le prénom de l'utilisateur
            localStorage.setItem('lastname', response.data.user.lastname);  // Stocker le nom de l'utilisateur
            localStorage.setItem('email', response.data.user.email);  // Stocker l'email de l'utilisateur
            localStorage.setItem('image', response.data.user.image || 'default_image_path');  // Stocker l'image de l'utilisateur ou une image par défaut si non définie
            localStorage.setItem('coverPhoto', response.data.user.coverPhoto || 'default_cover_photo_path');  // Stocker la photo de couverture de l'utilisateur ou une photo par défaut si non définie
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

// Mettre à jour la photo de profil de l'utilisateur
export const updateUserPhoto = async (formData) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await api.post('/updateProfilePhoto', formData, {
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

export const updateCoverPhoto = async (formData) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await api.post('/updateCoverPhoto', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong during updating cover photo');
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
        localStorage.removeItem('image');  // Supprimer l'image de localStorage
        localStorage.removeItem('coverPhoto');  // Supprimer la photo de couverture de localStorage
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong during logout');
    }
}
