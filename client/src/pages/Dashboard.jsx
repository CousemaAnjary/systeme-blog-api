import useAuth from '../hooks/useAuth';
import LogoutButton from '../components/LogoutButton';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user.firstName} {user.lastName}!</p>
            <LogoutButton />
        </div>
    );
};

export default Dashboard;
