import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Cette option permet d'inclure les cookies dans les requêtes
});

export default api;