export const isAuthenticated = () => {
    const token = localStorage.getItem('userToken');
    return !!token; // Convertit la présence du token en booléen
}
