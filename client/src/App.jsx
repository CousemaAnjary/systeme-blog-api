import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  // state (état, données) de l'application

  // comportement

  // affichage (render)
  return (
    <>
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
        </Route>

      </Routes>
    </>
  );
}