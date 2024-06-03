import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService'

export default function LoginForm() {
    // state (état, données) de l'application
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    // comportement
    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            await login(email, password)
            // Authentification réussie, rediriger vers la page  tableau de bord
            navigate('/admin/dashboard')

        } catch (err) {
            // Afficher le message d'erreur
            console.error(err);
        }
    };
    // affichage (render)
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center">Login</h2>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700">Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700">Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}