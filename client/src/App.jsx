import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserProvider } from "./contexts/UserContext";
import Profile from "./pages/Profile";
import ShowPost from "./pages/ShowPost";

export default function App() {
  // state (état, données) de l'application

  // comportement

  // affichage (render)
  return (
    <>
      <UserProvider>
        <Routes>
          {/* Route Publique */}
          <Route element={<PublicRoute />}>
            <Route path="/" />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Route Protégée */}
          <Route element={<PrivateRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/showPost" element={<ShowPost />} />
            <Route path="/admin/profile" element={<Profile />} />
          </Route>

        </Routes>
      </UserProvider>

    </>
  );
}