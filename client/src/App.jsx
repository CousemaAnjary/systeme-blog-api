import { Route, Routes } from "react-router-dom"
import PrivateRoute from "./components/routes/PrivateRoute"
import PublicRoute from "./components/routes/PublicRoute"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { UserProvider } from "./contexts/UserContext"
import Profile from "./pages/Profile"
import ShowPost from "./pages/ShowPost"
import CreatePost from "./pages/CreatePost"

export default function App() {
  return (
    <UserProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/showPost/:id" element={<ShowPost />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/createPost" element={<CreatePost />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}
