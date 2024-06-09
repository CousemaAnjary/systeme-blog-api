import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Camera, Video, Smile } from "lucide-react";
import useAuth from '../hooks/useAuth';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose, } from "@/components/ui/dialog";
import { createPublication } from '../services/publicationService';

export default function CreatePost() {
    // state (état, données) de l'application
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);

    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleCreatePost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user_id', user.userId);
        formData.append('content', content);
        if (file) {
            formData.append('image', file);
        }

        try {
            const response = await createPublication(formData);

            if (response) {
                setIsOpen(false);
                setContent('');
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

    return (
        <div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex items-center space-x-4">
                    <img className="w-10 h-10 rounded-full" src={imageURL} alt="User Avatar" />
                    <input
                        type="text"
                        placeholder={`Quoi de neuf, ${user.firstname} ?`}
                        className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none cursor-pointer"
                        readOnly
                        onClick={openModal}
                    />
                </div>
                <div className="flex justify-between mt-4">
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500">
                        <Video size={20} />
                        <span>Vidéo en direct</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-green-500">
                        <Camera size={20} />
                        <span>Photo/vidéo</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-yellow-500">
                        <Smile size={20} />
                        <span>Humeur/activité</span>
                    </button>
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={closeModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Créer une publication</DialogTitle>
                        <DialogClose />
                    </DialogHeader>
                    <form onSubmit={handleCreatePost} className="p-4">
                        <div className="flex items-center space-x-4 mb-4">
                            <img className="w-10 h-10 rounded-full" src={imageURL} alt="User Avatar" />
                            <div>
                                <h2 className="text-lg font-semibold">{user.firstname} {user.lastname}</h2>
                            </div>
                        </div>
                        <textarea
                            placeholder={`Quoi de neuf, ${user.firstname} ?`}
                            className="w-full h-24 bg-gray-100 rounded-lg p-2 outline-none mb-4"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
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
                            <button className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg" type="submit">Publier</button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
