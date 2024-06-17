import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"


export default function UpdateProfileForm() {
    /**
    * ! STATE (état, données) de l'application
    */
    const navigate = useNavigate()
    const { user, updateUser } = useAuth()
    const form = useForm()

    const [firstname, setFirstname] = useState(user.firstname)
    const [lastname, setLastname] = useState(user.lastname)
    const [email, setEmail] = useState(user.email)

    // Donnée à envoyer pour la mise à jour
    const dataUser = { firstname, lastname, email }

    /**
    * ! COMPORTEMENT (méthodes, fonctions) de l'application
    */
    const handleUpdate = async (e) => {
        // Empêcher le rechargement de la page
        e.preventDefault()

        try {

            await updateUser(dataUser)
            // Mise à jour réussie, rediriger vers le dashboard
            navigate('/admin/dashboard')
        }
        catch (err) {
            console.error('Erreur lors de la mise à jour:', err)
        }
    }


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Modifier les informations de l'utilisateur</h2>
            <Form {...form}>
                <form onSubmit={handleUpdate}>
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
                            </FormItem>
                        )}
                    />
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
    );
}
