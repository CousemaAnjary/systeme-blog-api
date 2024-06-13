import api from './apiConfig';

// Inscrire un nouvel utilisateur
export const register = async (dataRegister) => {
    try {
        // Appel à l'API pour enregistrer un nouvel utilisateur
        const response = await api.post('/register', dataRegister)
        return response.data // Retourner les données de la réponse de l'API

    } catch (error) {
        throw error.response ? error.response.data : new Error('Something went wrong during registration');
    }
}


// Authentifier un utilisateur
export const login = async (dataLogin) => {
    try {
        // Appel à l'API pour authentifier un utilisateur
        const response = await api.post('/login', dataLogin)

        // Si la réponse de l'API contient un token JWT 
        if (response.data.token) {
            // Stocker le token JWT dans localStorage etc
            localStorage.setItem('userToken', response.data.token)
            localStorage.setItem('userId', response.data.user.id)
            localStorage.setItem('firstname', response.data.user.firstname)
            localStorage.setItem('lastname', response.data.user.lastname)
            localStorage.setItem('email', response.data.user.email)
            localStorage.setItem('image', response.data.user.image || 'uploads/default.jpg')
            localStorage.setItem('coverPhoto', response.data.user.coverPhoto || 'uploads/default.jpg')
        }
        return response.data // Retourner les données de la réponse de l'API

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
}

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
        // Supprimer les données utilisateur du stockage local
        localStorage.removeItem('userToken')
        localStorage.removeItem('userId')
        localStorage.removeItem('firstname')
        localStorage.removeItem('lastname')
        localStorage.removeItem('email')
        localStorage.removeItem('image')
        localStorage.removeItem('coverPhoto')

    } catch (error) {
        throw error
    }
}
