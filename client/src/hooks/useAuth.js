import { useState, useEffect } from 'react';
import { login as loginService, logout as logoutService, updateUser as updateUserService, updateUserPhoto as updateUserPhotoService } from '../services/authService';
import { isAuthenticated, removeToken } from '../utils/auth';
import useUser from '../hooks/useUser';

// Hook personnalisé pour gérer l'authentification
const useAuth = () => {
    const [auth, setAuth] = useState(isAuthenticated());
    const { user, setUser } = useUser();

    useEffect(() => {
        if (auth) {
            setUser({
                firstname: localStorage.getItem('firstname'),
                lastname: localStorage.getItem('lastname'),
                email: localStorage.getItem('email')
            });
        }
    }, [auth, setUser]);

    const login = async (email, password) => {
        try {
            const response = await loginService(email, password);
            if (response.token) {
                setAuth(true);
                setUser({
                    firstname: localStorage.getItem('firstname'),
                    lastname: localStorage.getItem('lastname'),
                    email: localStorage.getItem('email')
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
            setUser({ firstname: '', lastname: '', email: '' });
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
