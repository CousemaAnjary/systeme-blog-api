import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Camera } from "lucide-react";
import useAuth from '../hooks/useAuth';
import UpdateProfile from "@/components/UpdateProfile";
import { useState, useRef } from 'react';

export default function Profile() {
    const { user, updateUserPhoto } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleChangePhoto = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        const formData = new FormData();
        formData.append('photo', file);

        updateUserPhoto(formData).then(response => {
            console.log('Photo de profil mise à jour:', response);
            if (response && response.user && response.user.image) {
                localStorage.setItem('image', response.user.image); // Mettre à jour le stockage local
                window.location.reload(); // Recharger la page pour mettre à jour l'affichage
            }
        }).catch(err => {
            console.error('Erreur lors de la mise à jour de la photo:', err);
        });
    };

    const imageURL = user.image ? `http://localhost:3000/${user.image}` : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";

    return (
        <>
            <Navbar />

            <div className="bg-gray-100 min-h-screen">
                <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://example.com/cover-photo.jpg')" }}>
                    <Button className="absolute bottom-4 right-4">Changer la photo de couverture</Button>
                </div>

                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center">
                        <div className="relative w-32 h-32 -mt-16 border-4 border-white rounded-full">
                            <Avatar className="w-32 h-32 -mt-1 border-4 border-white rounded-full">
                                <AvatarImage
                                    src={imageURL}
                                    alt="User"
                                    className="w-full h-full rounded-full"
                                />
                            </Avatar>
                            <button
                                onClick={handleChangePhoto}
                                className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5 text-white hover:bg-blue-600"
                            >
                                <Camera size={16} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="ml-4">
                            <h1 className="text-2xl font-bold">{user.lastname} {user.firstname}</h1>
                            <p className="text-gray-600">402 ami(e)s</p>
                        </div>

                        <div className="ml-auto flex space-x-2">
                            <Button className="bg-blue-500 text-white">Ajouter à la story</Button>
                        </div>
                    </div>

                    <Tabs defaultValue="publications" className="mt-6">
                        <TabsList className="flex space-x-4 border-b bg-gray-800">
                            <TabsTrigger value="publications" className="py-2 px-4 text-white hover:bg-gray-200">Publications</TabsTrigger>
                            <TabsTrigger value="profile" className="py-2 px-4 text-white hover:bg-gray-200">Profile</TabsTrigger>
                            <TabsTrigger value="amies" className="py-2 px-4 text-white hover:bg-gray-200">Ami(e)s</TabsTrigger>
                            <TabsTrigger value="photos" className="py-2 px-4 text-white hover:bg-gray-200">Photos</TabsTrigger>
                            <TabsTrigger value="videos" className="py-2 px-4 text-white hover:bg-gray-200">Vidéos</TabsTrigger>
                        </TabsList>

                        <TabsContent value="publications">
                            <div>Contenu des publications</div>
                        </TabsContent>

                        <TabsContent value="profile">
                            <UpdateProfile />
                        </TabsContent>

                        <TabsContent value="amies">
                            <div>Contenu des ami(e)s</div>
                        </TabsContent>

                        <TabsContent value="photos">
                            <div>Contenu des photos</div>
                        </TabsContent>
                        <TabsContent value="videos">
                            <div>Contenu des vidéos</div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
