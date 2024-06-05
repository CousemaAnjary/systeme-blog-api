import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function LogoutButton() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Déconnexion</button>
    );
}
