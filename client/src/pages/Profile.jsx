import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Camera, Pencil, Trash } from "lucide-react";
import 'yet-another-react-lightbox/styles.css';
import Lightbox from 'yet-another-react-lightbox';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getUserPublications, deletePublication } from "@/services/publicationService";
import useAuth from '../hooks/useAuth';
import Navbar from "@/components/Navbar";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import UpdatePasswordForm from "@/components/UpdatePasswordForm";

export default function Profile() {
    const { user, updateUserPhoto, updateCoverPhoto } = useAuth();
    const fileInputRef = useRef(null);
    const coverFileInputRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [lightboxImage, setLightboxImage] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [publications, setPublications] = useState([]);
    const navigate = useNavigate();

    const coverPhotoURL = user.coverPhoto ? `http://localhost:3000/${user.coverPhoto}` : null;

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const data = await getUserPublications();
                console.log("Fetched publications:", data.publications); // Log data
                setPublications(data.publications || []);
            } catch (error) {
                console.error('Erreur lors de la récupération des publications:', error);
            }
        };

        fetchPublications();
    }, []);

    const handleChangePhoto = () => {
        fileInputRef.current.click();
    };

    const handleChangeCoverPhoto = () => {
        coverFileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        const formData = new FormData();
        formData.append('photo', file);

        updateUserPhoto(formData).then(response => {
            if (response && response.user && response.user.image) {
                localStorage.setItem('image', response.user.image);
                window.location.reload(); 
            }
        }).catch(err => {
            console.error('Erreur lors de la mise à jour de la photo:', err);
        });
    };

    const handleCoverFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        const formData = new FormData();
        formData.append('coverPhoto', file);

        updateCoverPhoto(formData).then(response => {
            if (response && response.user && response.user.coverPhoto) {
                localStorage.setItem('coverPhoto', response.user.coverPhoto);
                window.location.reload();
            }
        }).catch(err => {
            console.error('Erreur lors de la mise à jour de la photo de couverture:', err);
        });
    };

    const handleImageClick = (imageURL) => {
        setLightboxImage(imageURL);
        setIsOpen(true);
    };

    const handleClick = (id) => {
        navigate(`/admin/showPost/${id}`);
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-100 min-h-screen">
                <div className="relative h-64 bg-cover bg-center cursor-pointer" style={{ backgroundImage: `url('${coverPhotoURL}')` }} onClick={() => handleImageClick(coverPhotoURL)}>
                    <Button className="absolute bottom-4 right-4" onClick={handleChangeCoverPhoto}>Changer la photo de couverture</Button>
                    <input
                        type="file"
                        ref={coverFileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleCoverFileChange}
                    />
                </div>
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center">
                        <div className="relative w-32 h-32 -mt-16 border-4 border-white rounded-full cursor-pointer" onClick={() => handleImageClick(`http://localhost:3000/${user.image}`)}>
                            <Avatar className="w-32 h-32 -mt-1 border-4 border-white rounded-full">
                                <AvatarImage src={`http://localhost:3000/${user.image}`} alt="User" className="w-full h-full rounded-full" />
                                <AvatarFallback>CA</AvatarFallback>
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
                            {/* <p className="text-gray-600">402 ami(e)s</p> */}
                        </div>
                        <div className="ml-auto flex space-x-2">
                            <Button className="bg-blue-500 text-white" onClick={() => setIsDialogOpen(true)}>
                                <Pencil className="mr-2 h-4 w-4" /> Modifier le profil
                            </Button>
                        </div>
                    </div>
                    <Tabs defaultValue="Mes publications" className="mt-6">
                        <TabsList className="flex space-x-4 border-b bg-gray-800">
                            <TabsTrigger value="Mes publications" className="py-2 px-4 text-white hover:bg-gray-200">Mes publications</TabsTrigger>
                            <TabsTrigger value="amies" className="py-2 px-4 text-white hover:bg-gray-200">Ami(e)s</TabsTrigger>
                            <TabsTrigger value="photos" className="py-2 px-4 text-white hover:bg-gray-200">Photos</TabsTrigger>
                            <TabsTrigger value="videos" className="py-2 px-4 text-white hover:bg-gray-200">Vidéos</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Mes publications">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {publications.map((post, index) => (
                                    <Card key={index} className="shadow-md flex flex-col justify-between">
                                        {post.image && <img src={`http://localhost:3000/${post.image}`} alt="Publication" className="rounded-t-lg w-full h-48 object-cover cursor-pointer" onClick={() => handleImageClick(`http://localhost:3000/${post.image}`)} />}
                                        <CardContent className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2 mt-2">
                                                <Avatar>
                                                    <AvatarImage src={`http://localhost:3000/${post.user.image}`} alt="User Avatar" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <div className="text-lg font-semibold">{post.user.firstname}</div>
                                                    <div className="text-gray-500 text-sm">
                                                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: fr })}
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge className="px-3 py-1 bg-cyan-900 font-bold mt-2">{post.category}</Badge>
                                            <CardTitle className="mt-2 cursor-pointer" onClick={() => handleClick(post.id)}>{post.title}</CardTitle>
                                            <CardDescription className="leading-7 mt-2" dangerouslySetInnerHTML={{ __html: truncateText(post.content, 200) }} />
                                        </CardContent>
                                        <CardFooter className="flex justify-between items-center mt-1">
                                            <Button className="flex items-center space-x-1 text-white bg-cyan-500">
                                                <Pencil size={20} />
                                                <span>Modifier</span>
                                            </Button>
                                            <Button className="flex items-center space-x-1 text-white bg-red-400">
                                                <Trash size={20} />
                                                <span>Supprimer</span>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
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
            {isOpen && (
                <Lightbox
                    open={isOpen}
                    close={() => setIsOpen(false)}
                    slides={[{ src: lightboxImage }]}
                />
            )}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Modifier le profil</DialogTitle>
                        <DialogClose />
                    </DialogHeader>
                    <Tabs defaultValue="profile">
                        <TabsList className="flex space-x-4 border-b">
                            <TabsTrigger value="profile">Modifier le profil</TabsTrigger>
                            <TabsTrigger value="password">Modifier le mot de passe</TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
                            <UpdateProfileForm />
                        </TabsContent>
                        <TabsContent value="password">
                            <UpdatePasswordForm />
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </>
    );
}
