import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import useAuth from '../hooks/useAuth';
import { Camera, Video, Smile } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { createPublication } from '../services/publicationService';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose, } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"


export default function CreatePost() {
    // state (état, données) de l'application
    const categories = ["Cuisine", "Loisirs", "Jardinage", "Voyage"]; // Données statiques pour les catégories
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const form = useForm()


    // comportement
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
                setIsOpen(false);
                setTitle('');
                setContent('');
                setCategory('');
                setFile(null);
                navigate(0); // Recharger la page pour voir la nouvelle publication (vous pouvez améliorer cela avec un état global)
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const imageURL = user.image ? `http://localhost:3000/${user.image}` : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";

    // affichage (render)
    return (
        <div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src={imageURL} alt="User Avatar" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <Input
                        type="text"
                        placeholder={`Quoi de neuf, ${user.firstname} ?`}
                        className="bg-gray-100 rounded-full cursor-pointer"
                        onClick={openModal}
                        readOnly
                    />
                </div>

                <div className="flex justify-between mt-4">
                    <Button variant="link" className="space-x-2 text-gray-400 hover:text-green-500" >
                        <Camera size={20} />
                        <span>Photo/vidéo</span>
                    </Button>

                    <Button variant="link" className="space-x-2 text-gray-400 hover:text-yellow-500" >
                        <Smile size={20} />
                        <span>Humeur/activité</span>
                    </Button>
                </div>

            </div>

            <Dialog open={isOpen} onOpenChange={closeModal}>
                <DialogContent>

                    <DialogHeader>
                        <DialogTitle>Créer une publication</DialogTitle>
                        <DialogClose />
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={handleCreatePost} className="p-4">

                            <div className="flex items-center space-x-4 mb-4">
                                <Avatar>
                                    <AvatarImage src={imageURL} alt="User Avatar" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{user.firstname} {user.lastname}</h4>
                                </div>
                            </div>

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

                            <Textarea
                                placeholder={`Quoi de neuf, ${user.firstname} ?`}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="mb-3"
                            />

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

                            <div className="flex justify-center items-center mb-4">
                                <div className="w-full border border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center">
                                    <input type="file" onChange={handleFileChange} className="hidden" id="fileUpload" />
                                    <label htmlFor="fileUpload" className="cursor-pointer">
                                        <div className="flex flex-col items-center">
                                            <span className="text-gray-500 mb-2">Ajouter des photos/vidéos</span>
                                            <span className="text-gray-500 text-sm">ou faites glisser-déposer</span>
                                        </div>
                                    </label>
                                    {file && <p className="mt-4 text-gray-500">{file.name}</p>}
                                </div>
                            </div>

                            <div className="flex justify-between mt-4">
                                <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 mb-2" type="button">
                                    <Video size={20} />
                                    <span>Vidéo en direct</span>
                                </button>

                                <button className="flex items-center space-x-2 text-gray-400 hover:text-yellow-500 mb-2" type="button">
                                    <Smile size={20} />
                                    <span>Humeur/activité</span>
                                </button>
                            </div>
                            <DialogFooter>
                                {/* <button className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg" type="submit">Publier</button> */}
                                <Button className="bg-blue-500 w-full text-white">Publier</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
