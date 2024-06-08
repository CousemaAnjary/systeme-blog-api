import { createContext, useState, useEffect } from 'react';

// Création d'un nouveau contexte appelé UserContext
const UserContext = createContext();

// Composant fournisseur du contexte utilisateur (UserProvider)
export const UserProvider = ({ children }) => {
    // Initialisation de l'état utilisateur avec les données du localStorage
    const [user, setUser] = useState({
        firstname: localStorage.getItem('firstname') || '', // Récupère 'firstname' depuis le localStorage ou utilise une chaîne vide si non défini
        lastname: localStorage.getItem('lastname') || '', // Récupère 'lastname' depuis le localStorage ou utilise une chaîne vide si non défini
        email: localStorage.getItem('email') || '', // Récupère 'email' depuis le localStorage ou utilise une chaîne vide si non défini
        image: localStorage.getItem('image') || '' // Récupère 'image' depuis le localStorage ou utilise une chaîne vide si non défini
    });

    // useEffect pour mettre à jour l'état utilisateur quand le composant est monté
    useEffect(() => {
        setUser({
            firstname: localStorage.getItem('firstname') || '', // Met à jour 'firstname' avec la valeur du localStorage ou une chaîne vide
            lastname: localStorage.getItem('lastname') || '', // Met à jour 'lastname' avec la valeur du localStorage ou une chaîne vide
            email: localStorage.getItem('email') || '', // Met à jour 'email' avec la valeur du localStorage ou une chaîne vide
            image: localStorage.getItem('image') || '' // Met à jour 'image' avec la valeur du localStorage ou une chaîne vide
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
