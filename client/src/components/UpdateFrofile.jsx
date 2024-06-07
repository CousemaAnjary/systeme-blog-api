import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

export default function UpdateFrofile() {
    // state (état, données) de l'application
    const form = useForm()
    // comportement

    // affichage (render)
    return (
        <>
            <div className="p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4">Modifier les informations de l'utilisateur</h2>
                <Form {...form} >
                    <form >
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
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