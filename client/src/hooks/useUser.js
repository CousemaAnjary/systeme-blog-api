import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

// Hook personnalisé pour utiliser le contexte utilisateur
const useUser = () => {
    return useContext(UserContext); // Utilisation du contexte UserContext pour accéder à l'utilisateur et à la fonction setUser
};

export default useUser;
