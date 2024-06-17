import { createContext, useState, useEffect } from 'react';

// Création d'un nouveau contexte appelé UserContext
const UserContext = createContext();

// Composant fournisseur du contexte utilisateur (UserProvider)
export const UserProvider = ({ children }) => {

    // Utilisation du hook useState pour initialiser les données utilisateur
    const [user, setUser] = useState({
        userId: '',
        firstname: '',
        lastname: '',
        email: '',
        image: '',
        coverPhoto: ''
    });

    useEffect(() => {
        // Récupérer les données utilisateur depuis le localStorage uniquement lors de l'initialisation
        const userData = {
            userId: localStorage.getItem('userId') || '', // Récupérer l'ID utilisateur depuis le localStorage ou une chaîne vide
            firstname: localStorage.getItem('firstname') || '',
            lastname: localStorage.getItem('lastname') || '',
            email: localStorage.getItem('email') || '',
            image: localStorage.getItem('image') || '',
            coverPhoto: localStorage.getItem('coverPhoto') || ''
        };
        // Mettre à jour les données utilisateur dans le contexte
        setUser(userData)
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Export du contexte UserContext pour utilisation dans d'autres fichiers
export { UserContext };
