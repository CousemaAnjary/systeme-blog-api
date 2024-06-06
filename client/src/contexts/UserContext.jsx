import { createContext, useState, useContext, useEffect } from 'react';

// Création d'un nouveau contexte appelé UserContext
const UserContext = createContext();

// Composant fournisseur du contexte utilisateur (UserProvider)
export const UserProvider = ({ children }) => {
    // Initialisation de l'état utilisateur avec les données du localStorage
    const [user, setUser] = useState({
        firstName: localStorage.getItem('firstName') || '', // Récupère 'firstName' depuis le localStorage ou utilise une chaîne vide si non défini
        lastName: localStorage.getItem('lastName') || '' // Récupère 'lastName' depuis le localStorage ou utilise une chaîne vide si non défini
    });

    // useEffect pour mettre à jour l'état utilisateur quand le composant est monté
    useEffect(() => {
        setUser({
            firstName: localStorage.getItem('firstName') || '', // Met à jour 'firstName' avec la valeur du localStorage ou une chaîne vide
            lastName: localStorage.getItem('lastName') || '' // Met à jour 'lastName' avec la valeur du localStorage ou une chaîne vide
        });
    }, []);

    // Rendu du fournisseur du contexte avec les valeurs de user et setUser
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children} {/* Rendu des composants enfants */}
        </UserContext.Provider>
    );
};

// Export du contexte UserContext pour utilisation dans d'autres fichiers
export { UserContext };
