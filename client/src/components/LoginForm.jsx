import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import useAuth from '../hooks/useAuth';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";



export default function LoginForm() {
    // state (état, données) de l'application
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth();
    const navigate = useNavigate()
    const form = useForm()

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

            <Form {...form}>
                <form onSubmit={handleLogin}>
                    <Card>
                        {/* Header */}
                        <CardHeader>
                            <CardTitle>Connéxion</CardTitle>
                            <CardDescription>Veuillez vous connecter pour accéder à votre compte</CardDescription>
                        </CardHeader>

                        {/* Content */}
                        <CardContent>
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
                            <FormField
                                control={form.control}
                                name="password"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Mot de passe</FormLabel>
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
                        </CardContent>

                        {/* Footer */}
                        <CardFooter>
                            <Button type="submit">Se connecter</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>

        </>
    )
}