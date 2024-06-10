import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import useAuth from '../hooks/useAuth';
import { Camera, Video, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { createPublication } from '../services/publicationService';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import QuillEditor from "@/components/QuillEditor"; // Assurez-vous que le chemin est correct

export default function CreatePost() {
    const categories = ["Cuisine", "Loisirs", "Jardinage", "Voyage"];
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    const form = useForm();

    const handleCreatePost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user_id', user.userId);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        if (file) {
            formData.append('image', file);
        }

        try {
            const response = await createPublication(formData);

            if (response) {
                setTitle('');
                setContent('');
                setCategory('');
                setFile(null);
                navigate('/admin/dashboard');
            }
        } catch (error) {
            console.error('Erreur lors de la création du post:', error);
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const imageURL = user.image ? `http://localhost:3000/${user.image}` : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto p-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold mb-6">Créer une publication</h2>
                    <div className="flex items-center space-x-4 mb-4">
                        <Avatar>
                            <AvatarImage src={imageURL} alt="User Avatar" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{user.firstname} {user.lastname}</h4>
                        </div>
                    </div>

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
