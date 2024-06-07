import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import useAuth from '../hooks/useAuth';

export default function UpdateFrofile() {
    // state (état, données) de l'application
    const { user, updateUser } = useAuth();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const navigate = useNavigate()
    const form = useForm()


    // comportement
    const handleUpdate = async (e) => {
       
        try {
            await updateUser({ firstName, lastName, email })
            // Authentification réussie, rediriger vers la page  tableau de bord
            navigate('/admin/dashboard')

        } catch (err) {
            // Afficher le message d'erreur
            console.error(err);
        }
    }

    // affichage (render)
    return (
        <>
            <div className="p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4">Modifier les informations de l'utilisateur</h2>
                <Form {...form} >
                    <form onSubmit={handleUpdate}>
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="Entrez votre prénom"
                                            required
                                        />
                                    </FormControl>

                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Entrez votre nom"
                                            required
                                        />
                                    </FormControl>

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

                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="bg-blue-500 text-white mt-4">Mettre à jour</Button>
                    </form>
                </Form>
            </div>
        </>
    )
}