import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Button } from '@/components/ui/button';

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
        <>
           
            <Button onClick={handleLogout}>Deconéxion</Button>
        </>

    );
}
