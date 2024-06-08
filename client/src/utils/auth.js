// utils/auth.js
export const isAuthenticated = () => {
    const token = localStorage.getItem('userToken');
    return !!token; // retourne true si le token existe, sinon false
}

export const removeToken = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('email');
    localStorage.removeItem('image');  // Supprimer l'image du stockage local
}
