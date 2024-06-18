import axios from 'axios';
import { removeToken } from '../utils/auth';

// Récupérer l'URL de base de l'API à partir des variables d'environnement
const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Ajouter un intercepteur de requête pour inclure le token JWT dans les en-têtes d'authentification
api.interceptors.request.use((config) => {
    // Récupérer le token JWT de localStorage
    const token = localStorage.getItem('userToken')

    if (token) {
        // Ajouter le token JWT aux en-têtes d'authentification
        config.headers.Authorization = `Bearer ${token}`
    }

    return config

}, (error) => {
    return Promise.reject(error)
});


// Ajouter un intercepteur de réponse pour gérer les erreurs d'authentification
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expiré ou non valide, supprimer le token et rediriger l'utilisateur
            removeToken();
            window.location.href = '/login'; // Rediriger vers la page de connexion
        }
        return Promise.reject(error);
    }
);

export default api;
