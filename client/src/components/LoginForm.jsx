import { useState } from "react"
import useAuth from '../hooks/useAuth'
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import imageLogin from '../assets/images/login.svg'
import { useNavigate, Link } from 'react-router-dom'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"


export default function LoginForm() {
    /**
     * ! STATE (état, données) de l'application
     */
    const navigate = useNavigate()
    const { login } = useAuth()
    const form = useForm()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Données à envoyer pour la connexion
    const dataLogin = { email, password }


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleLogin = async (e) => {
        // Empêcher le rechargement de la page
        e.preventDefault()

        try {
            await login(dataLogin)
            // Authentification réussie, rediriger vers la page tableau de bord
            navigate('/admin/dashboard')

        } catch (err) {
            // Afficher le message d'erreur
            console.error(err);
        }
    }


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <Form {...form}>
            <form onSubmit={handleLogin}>
                <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                    <div className="flex items-center justify-center py-12">
                        <div className="mx-auto grid w-[350px] gap-6">
                            <div className="grid gap-2 text-center">
                                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-700">FriendZy</h1>
                                <p className="text-balance text-muted-foreground">
                                    Entrez votre email ci-dessous pour vous connecter à votre compte
                                </p>
                            </div>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Entrez votre email"
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Mot de passe</Label>
                                        <Link to="#" className="ml-auto inline-block text-sm underline">   Mot de passe oublié ? </Link>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={() => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="Entrez votre mot de passe"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-blue-600">
                                    Se connecter
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Vous n'avez pas de compte ?{" "}
                                <Link to="/register" className="underline">
                                    S'inscrire
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <img
                            src={imageLogin}
                            alt="Image"
                            width="920"
                            height="080"
                            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </div>
            </form>
        </Form>
    )
}
