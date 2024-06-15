import axios from 'axios';

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
        config.headers = config.headers || {} // Créer un objet headers s'il n'existe pas
        config.headers['Authorization'] = `Bearer ${token}` // Ajouter le token JWT à l'en-tête Authorization
        config.headers['Content-Type'] = 'multipart/form-data' // Ajouter le type de contenu pour les requêtes multipart/form-data
    }

    return config

}, (error) => {
    return Promise.reject(error)
});

export default api;
