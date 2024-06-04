import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

export default function LogoutButton() {
    // state (état, données) de l'application
    const navigate = useNavigate();

    // comportement
    const handleLogout = async () => {
        try {
            await logout();
            // Déconnexion réussie, rediriger vers la page de connexion
            navigate('/login');

        } catch (error) {
            console.error(error);
        }
    }
    // affichage (render)
    return (
        <button onClick={handleLogout}>Déconnexion</button>
    );
}