import useAuth from '../hooks/useAuth';
import LogoutButton from '../components/LogoutButton';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <>
            <Navbar />
            <div>
                <h1>Dashboard</h1>
                <p>Welcome, {user.firstName} {user.lastName}!</p>
                <LogoutButton />
            </div>
        </>

    );
};

export default Dashboard;
