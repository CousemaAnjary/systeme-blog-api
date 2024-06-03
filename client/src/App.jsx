import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

export default function App() {
  // state (état, données) de l'application

  // comportement

  // affichage (render)
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />

      </Routes>
    </>
  );
}