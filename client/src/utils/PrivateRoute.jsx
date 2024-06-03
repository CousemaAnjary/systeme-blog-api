import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { protectedRoute } from '../services/authService';

export default function PrivateRoute() {
    // state (état, données) de l'application
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // comportement
    useEffect(() => {
        const verifyAuth = async () => {
            // Vérifier si l'utilisateur est authentifié.
            const authStatus = await protectedRoute();
            setIsAuthenticated(authStatus);
        };

        verifyAuth();
    }, []);

    // affichage (render)
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )

}