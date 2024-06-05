import { useState, useEffect } from 'react';
import { login as loginService, logout as logoutService } from '../services/authService';
import { isAuthenticated, removeToken } from '../utils/auth';
import { useUser } from '../contexts/UserContext';

const useAuth = () => {
    const [auth, setAuth] = useState(isAuthenticated());
    const { user, setUser } = useUser();

    useEffect(() => {
        if (auth) {
            setUser({
                firstName: localStorage.getItem('firstName'),
                lastName: localStorage.getItem('lastName')
            });
        }
    }, [auth, setUser]);

    const login = async (email, password) => {
        try {
            const response = await loginService(email, password);
            if (response.token) {
                setAuth(true);
                setUser({
                    firstName: localStorage.getItem('firstName'),
                    lastName: localStorage.getItem('lastName')
                });
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutService();
            removeToken();
            setAuth(false);
            setUser({ firstName: '', lastName: '' });
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    return {
        isAuthenticated: auth,
        user,
        login,
        logout
    };
};

export default useAuth;
