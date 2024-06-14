import { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { register } from '../services/authService'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"


export default function RegisterForm() {
    /**
     *  ! STATE (état, données) de l'application
    */
    const navigate = useNavigate()
    const form = useForm()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')

    // Données à envoyer pour l'inscription
    const dataRegister = { email, password, lastname, firstname }


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
    */
    const handleRegister = async (e) => {
        // Empêcher le rechargement de la page
        e.preventDefault();

        try {
            await register(dataRegister);
            // Inscription réussie, rediriger vers la page de connexion
            navigate('/login');

        } catch (err) {
            // Afficher le message d'erreur
            console.error(err);
        }
    }

    /**
     * ! AFFICHAGE (render) de l'application
    */
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
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">

                                    <div className="grid gap-2">
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
                                                            placeholder="ABDILLAH"
                                                            required
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid gap-2">
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
                                                            placeholder="Cousema Anjary"
                                                            required
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

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
                                                        placeholder="m@exemple.com"
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-2">
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
                                </div>
                                <Button type="submit" className="w-full bg-blue-600">S'inscrire</Button>
                                <div className=" text-center text-sm">
                                    Vous avez déjà un compte ?{" "}
                                    <Link to="/login" className="underline">
                                        Se connecter
                                    </Link>
                                </div>
                            </div>
                        </CardContent>

                    </Card>
                </form>
            </Form>

        </>
    )

}