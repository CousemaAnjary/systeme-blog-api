import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, logout as logoutService, updateUser as updateUserService, updateUserPhoto as updateUserPhotoService } from '../services/authService';
import { isAuthenticated, removeToken } from '../utils/auth';
import useUser from '../hooks/useUser';

// Hook personnalisé pour gérer l'authentification
const useAuth = () => {
    const [auth, setAuth] = useState(isAuthenticated());
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            setUser({
                firstname: localStorage.getItem('firstname'),
                lastname: localStorage.getItem('lastname'),
                email: localStorage.getItem('email'),
                image: localStorage.getItem('image') // Ajoutez l'image au contexte utilisateur
            });
        } else {
            navigate('/login');
        }
    }, [auth, setUser, navigate]);

    const login = async (email, password) => {
        try {
            const response = await loginService(email, password);
            if (response.token) {
                localStorage.setItem('userToken', response.token);
                localStorage.setItem('firstname', response.user.firstname);
                localStorage.setItem('lastname', response.user.lastname);
                localStorage.setItem('email', response.user.email);
                localStorage.setItem('image', response.user.image); // Stockez l'image dans le localStorage
                setAuth(true);
                setUser({
                    firstname: response.user.firstname,
                    lastname: response.user.lastname,
                    email: response.user.email,
                    image: response.user.image // Mettez à jour le contexte utilisateur avec l'image
                });
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const updateUser = async (userData) => {
        try {
            const response = await updateUserService(userData);
            if (response) {
                localStorage.setItem('firstname', userData.firstname);
                localStorage.setItem('lastname', userData.lastname);
                localStorage.setItem('email', userData.email);
                setUser(userData);
            }
        } catch (error) {
            console.error('Update user failed:', error);
            throw error;
        }
    };

    const updateUserPhoto = async (formData) => {
        try {
            const response = await updateUserPhotoService(formData);
            if (response) {
                localStorage.setItem('image', response.user.image);
                setUser((prevUser) => ({ ...prevUser, image: response.user.image }));
            }
        } catch (error) {
            console.error('Update user photo failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutService();
            removeToken();
            setAuth(false);
            setUser({ firstname: '', lastname: '', email: '', image: '' });
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    return {
        isAuthenticated: auth,
        user,
        login,
        logout,
        updateUser,
        updateUserPhoto
    };
};

export default useAuth;
