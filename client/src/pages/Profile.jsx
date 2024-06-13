import useAuth from '../hooks/useAuth'
import Navbar from "@/components/Navbar"
import { useState, useRef } from 'react'
import { Camera, Pencil } from "lucide-react"
import 'yet-another-react-lightbox/styles.css'
import { Button } from "@/components/ui/button"
import Lightbox from 'yet-another-react-lightbox'
import UpdateProfileForm from "@/components/UpdateProfileForm"
import UpdatePasswordForm from "@/components/UpdatePasswordForm"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"

export default function Profile() {
    /**
     * ! STATE (état, données) de l'application
     */
    const { user, updateUserPhoto, updateCoverPhoto } = useAuth()

    const fileInputRef = useRef(null)
    const coverFileInputRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [lightboxImage, setLightboxImage] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const coverPhotoURL =  `http://localhost:3000/${user.coverPhoto}` 


    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */
    const handleChangePhoto = () => {
        // Ouvrir la fenêtre de dialogue pour choisir un fichier
        fileInputRef.current.click()
    }

    const handleChangeCoverPhoto = () => {
        coverFileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        // Récupérer le fichier sélectionné
        const file = e.target.files[0]
        setSelectedFile(file) // Mettre à jour le fichier sélectionné

        // Créer un objet FormData pour envoyer le fichier au serveur
        const formData = new FormData()
        formData.append('photo', file) // Ajouter le fichier à l'objet FormData

        updateUserPhoto(formData).then(response => {
            if (response && response.user && response.user.image) {
                // Mettre à jour l'image de profil dans le stockage local
                localStorage.setItem('image', response.user.image)
                window.location.reload() // Recharger la page pour afficher la nouvelle image
            }

        }).catch(err => {
            console.error('Erreur lors de la mise à jour de la photo:', err)
        })
    }

    const handleCoverFileChange = (e) => {
        const file = e.target.files[0]
        setSelectedFile(file);

        const formData = new FormData()
        formData.append('coverPhoto', file)

        updateCoverPhoto(formData).then(response => {
            if (response && response.user && response.user.coverPhoto) {
                // Mettre à jour la photo de couverture dans le stockage local
                localStorage.setItem('coverPhoto', response.user.coverPhoto)
                window.location.reload()
            }

        }).catch(err => {
            console.error('Erreur lors de la mise à jour de la photo de couverture:', err);
        })
    }

    // Ouvrir la lightbox pour afficher l'image en plein écran
    const handleImageClick = (imageURL) => {
        setLightboxImage(imageURL) // Mettre à jour l'URL de l'image
        setIsOpen(true) // Ouvrir la lightbox
    }


    /**
     * ! AFFICHAGE (render) de l'application
     */
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
                        <div className="relative w-32 h-32 -mt-16 border-4 border-white rounded-full cursor-pointer" onClick={() => handleImageClick(imageURL)}>
                            <Avatar className="w-32 h-32 -mt-1 border-4 border-white rounded-full">
                                <AvatarImage
                                    src={`http://localhost:3000/${user.image}`}
                                    alt="User"
                                    className="w-full h-full rounded-full"
                                />
                                <AvatarFallback >CA </AvatarFallback>

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
                            <Button className="bg-blue-500 text-white" onClick={() => setIsDialogOpen(true)}>
                                <Pencil className="mr-2 h-4 w-4" /> Modifier le profil
                            </Button>
                        </div>
                    </div>

                    <Tabs defaultValue="publications" className="mt-6">
                        <TabsList className="flex space-x-4 border-b bg-gray-800">
                            <TabsTrigger value="publications" className="py-2 px-4 text-white hover:bg-gray-200">Publications</TabsTrigger>
                            <TabsTrigger value="amies" className="py-2 px-4 text-white hover:bg-gray-200">Ami(e)s</TabsTrigger>
                            <TabsTrigger value="photos" className="py-2 px-4 text-white hover:bg-gray-200">Photos</TabsTrigger>
                            <TabsTrigger value="videos" className="py-2 px-4 text-white hover:bg-gray-200">Vidéos</TabsTrigger>
                        </TabsList>

                        <TabsContent value="publications">
                            <div>Contenu des publications</div>
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
