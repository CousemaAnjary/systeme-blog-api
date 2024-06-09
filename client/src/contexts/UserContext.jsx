import { createContext, useState, useEffect } from 'react';

// Création d'un nouveau contexte appelé UserContext
const UserContext = createContext();

// Composant fournisseur du contexte utilisateur (UserProvider)
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        userId: localStorage.getItem('userId') || '', // Ajouter l'identifiant de l'utilisateur
        firstname: localStorage.getItem('firstname') || '',
        lastname: localStorage.getItem('lastname') || '',
        email: localStorage.getItem('email') || '',
        image: localStorage.getItem('image') || '',
        coverPhoto: localStorage.getItem('coverPhoto') || ''// Ajouter la photo de couverture

    });

    useEffect(() => {
        setUser({
            userId: localStorage.getItem('userId') || '', // Ajouter l'identifiant de l'utilisateur
            firstname: localStorage.getItem('firstname') || '',
            lastname: localStorage.getItem('lastname') || '',
            email: localStorage.getItem('email') || '',
            image: localStorage.getItem('image') || '',
            coverPhoto: localStorage.getItem('coverPhoto') || '', // Ajouter la photo de couverture

        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Export du contexte UserContext pour utilisation dans d'autres fichiers
export { UserContext };
