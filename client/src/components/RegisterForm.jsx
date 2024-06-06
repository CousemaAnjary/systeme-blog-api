import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";



export default function RegisterForm() {
    // state (état, données) de l'application
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const navigate = useNavigate();
    const form = useForm()

    // comportement
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await register(email, password, lastname, firstname);
            // Inscription réussie, rediriger vers la page de connexion ou le tableau de bord
            navigate('/login');

        } catch (err) {
            // Afficher le message d'erreur
            console.error(err);
        }
    }

    // affichage (render)
    return (
        <>
            <Form {...form}>
                <form onSubmit={handleRegister}>
                    <Card>
                        {/* Header */}
                        <CardHeader>
                            <CardTitle>Inscription</CardTitle>
                            <CardDescription>Veuillez vous inscrire pour accéder à votre compte</CardDescription>
                        </CardHeader>

                        {/* Content */}
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="lastname"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Nom</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                value={lastname}
                                                onChange={(e) => setLastname(e.target.value)}
                                                placeholder="Entrez votre nom"
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Prénom</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                value={firstname}
                                                onChange={(e) => setFirstname(e.target.value)}
                                                placeholder="Entrez votre prénom"
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </CardContent>

                        {/* Footer */}
                        <CardFooter>
                            <Button type="submit">S'inscrire</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>

        </>
    )

}