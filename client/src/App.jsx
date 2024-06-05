import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

export default function App() {
  // state (état, données) de l'application

  // comportement

  // affichage (render)
  return (
    <>
      <Routes>
        <Route path="/register" element={<PublicRoute element={<Register />} />} />
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/admin/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      </Routes>
    </>
  );
}