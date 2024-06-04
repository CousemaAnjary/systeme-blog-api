import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  // state (état, données) de l'application

  // comportement

  // affichage (render)
  return (
    <>
      <Routes>
        {/* Route Protégée */}
        {/* <Route element={<PrivateRoutes />}>
         
        </Route> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

      </Routes>
    </>
  );
}