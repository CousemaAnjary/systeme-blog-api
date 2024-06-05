import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const PublicRoute = ({ element }) => {
  return isAuthenticated() ? <Navigate to="/admin/dashboard" /> : element;
};

export default PublicRoute;
