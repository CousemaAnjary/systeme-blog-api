import { useState } from "react"
import useAuth from '../hooks/useAuth'
import Navbar from "@/components/Navbar"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import QuillEditor from "@/components/QuillEditor"
import { createPublication } from '../services/publicationService'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreatePost() {
    /**
     * ! STATE (état, données) de l'application
     */
    const navigate = useNavigate()
    const { user } = useAuth()
    const form = useForm()

    const categories = ["Cuisine", "Loisirs", "Jardinage", "Voyage", "Bien-être", "Décoration", "Bricolage", "Informatique", "Sport", "Actualités", "Autres"]
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('')
    const [file, setFile] = useState(null)


    // Données à envoyer pour la création de la publication
    const dataPublication = { user_id: user.userId, title, content, category, image: file }


    /**
    * ! COMPORTEMENT (méthodes, fonctions) de l'application
    */
    const handleCreatePost = async (e) => {
        // Empêcher le rechargement de la page
        e.preventDefault()

        try {
            await createPublication(dataPublication)
            // Publication créée, rediriger vers la page d'accueil
            navigate('/admin/dashboard')

        } catch (err) {
            // Afficher le message d'erreur
            console.error(err)
        }
    }

    // Gérer le changement de fichier
    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    const imageURL = user.image ? `http://localhost:3000/${user.image}` : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";



    /**
    * ! AFFICHAGE (render) de l'application
    */
    return (
        <div className="bg-gray-100 min-h-screen ">
            <Navbar />
            <div className="container mx-auto p-8 mt-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold mb-6">Créer une publication</h2>
                    <Form {...form}>
                        <form onSubmit={handleCreatePost} className="p-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={() => (
                                    <FormItem className="mb-3">
                                        <FormLabel>Titre</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Entrez le titre de votre publication"
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormItem className="mb-3">
                                <FormLabel>Contenu</FormLabel>
                                <QuillEditor
                                    content={content}
                                    setContent={setContent}
                                    placeholder="Écrivez votre contenu ici..."
                                />
                            </FormItem>

                            <FormItem className="mb-3">
                                <FormLabel>Catégorie</FormLabel>
                                <Select onValueChange={setCategory}>
                                    <SelectTrigger className="mb-3">
                                        <SelectValue placeholder="Choisir une catégorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Catégories</SelectLabel>
                                            {categories.map((cat, index) => (
                                                <SelectItem key={index} value={cat}>{cat}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormItem>

                            <FormItem className="mb-4">
                                <FormLabel>Ajouter des photos/vidéos</FormLabel>
                                <div className="border border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center">
                                    <input type="file" onChange={handleFileChange} className="hidden" id="fileUpload" />
                                    <label htmlFor="fileUpload" className="cursor-pointer">
                                        <div className="flex flex-col items-center">
                                            <span className="text-gray-500 mb-2">Ajouter des photos/vidéos</span>
                                            <span className="text-gray-500 text-sm">ou faites glisser-déposer</span>
                                        </div>
                                    </label>
                                    {file && <p className="mt-4 text-gray-500">{file.name}</p>}
                                </div>
                            </FormItem>

                            <Button className="bg-blue-500 w-full text-white" type="submit">Publier</Button>

                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
