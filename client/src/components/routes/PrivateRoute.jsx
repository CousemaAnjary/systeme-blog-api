import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

const PrivateRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
