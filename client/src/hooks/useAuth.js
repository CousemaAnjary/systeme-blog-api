import { useState, useEffect } from 'react';
import { login as loginService, logout as logoutService } from '../services/authService';
import { isAuthenticated, removeToken } from '../utils/auth';
import useUser from '../hooks/useUser'; 

// Hook personnalisé pour gérer l'authentification
const useAuth = () => {
    // État local pour vérifier si l'utilisateur est authentifié
    const [auth, setAuth] = useState(isAuthenticated());

    // Accès au contexte utilisateur pour obtenir et mettre à jour les informations utilisateur
    const { user, setUser } = useUser();

    // useEffect pour mettre à jour l'utilisateur dans le contexte lorsque l'état d'authentification change
    useEffect(() => {
        if (auth) {
            setUser({
                firstName: localStorage.getItem('firstName'),
                lastName: localStorage.getItem('lastName')
            });
        }
    }, [auth, setUser]);

    // Fonction pour gérer la connexion de l'utilisateur
    const login = async (email, password) => {
        try {
            // Appel du service de connexion
            const response = await loginService(email, password);
            if (response.token) {
                // Mise à jour de l'état d'authentification
                setAuth(true);
                // Mise à jour des informations utilisateur dans le contexte
                setUser({
                    firstName: localStorage.getItem('firstName'),
                    lastName: localStorage.getItem('lastName')
                });
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Relance l'erreur pour la gestion en amont
        }
    };

    // Fonction pour gérer la déconnexion de l'utilisateur
    const logout = async () => {
        try {
            // Appel du service de déconnexion
            await logoutService();
            // Suppression du token et des informations utilisateur du localStorage
            removeToken();
            // Mise à jour de l'état d'authentification
            setAuth(false);
            // Réinitialisation des informations utilisateur dans le contexte
            setUser({ firstName: '', lastName: '' });
        } catch (error) {
            console.error('Logout failed:', error);
            throw error; // Relance l'erreur pour la gestion en amont
        }
    };

    // Retourne les fonctions et états pour gérer l'authentification
    return {
        isAuthenticated: auth,
        user,
        login,
        logout
    };
};

export default useAuth;
