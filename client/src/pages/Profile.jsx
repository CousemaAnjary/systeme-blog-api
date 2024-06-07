import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import useAuth from '../hooks/useAuth';
import UpdateFrofile from "@/components/UpdateFrofile";

export default function Profile() {
    // state (état, données) de l'application
    const { user } = useAuth();
    // comportement

    // affichage (render)
    return (
        <>
            <Navbar />

            <div className="bg-gray-100 min-h-screen">
                {/* Photo de couverture */}
                <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://example.com/cover-photo.jpg')" }}>
                    <Button className="absolute bottom-4 right-4">Changer la photo de couverture</Button>
                </div>

                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center">
                        {/* Photo de profil */}
                        <Avatar className="w-32 h-32 -mt-16 border-4 border-white rounded-full">
                            <AvatarImage
                                src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                                alt="User"
                                className="w-full h-full"
                            />
                        </Avatar>

                        {/* Informations utilisateur */}
                        <div className="ml-4">
                            <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                            <p className="text-gray-600">402 ami(e)s</p>
                            {/* <div className="flex mt-2">
                                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://example.com/friend1.jpg" alt="Friend 1" />
                                <img className="w-8 h-8 rounded-full border-2 border-white -ml-2" src="https://example.com/friend2.jpg" alt="Friend 2" />
                                <img className="w-8 h-8 rounded-full border-2 border-white -ml-2" src="https://example.com/friend3.jpg" alt="Friend 3" />
                                <img className="w-8 h-8 rounded-full border-2 border-white -ml-2" src="https://example.com/friend4.jpg" alt="Friend 4" />
                            </div> */}
                        </div>

                        {/* Actions utilisateur */}
                        <div className="ml-auto flex space-x-2">
                            <Button className="bg-blue-500 text-white">Ajouter à la story</Button>
                        </div>
                    </div>

                    {/* Navigation du profil */}
                    <Tabs defaultValue="profile" className="mt-6 ">
                        <TabsList className="flex space-x-4 border-b bg-gray-800">
                            <TabsTrigger value="profile" className="py-2 px-4 text-white hover:bg-gray-200">Profile</TabsTrigger>
                            <TabsTrigger value="publications" className="py-2 px-4 text-white hover:bg-gray-200">Publications</TabsTrigger>
                            <TabsTrigger value="amies" className="py-2 px-4 text-white hover:bg-gray-200">Ami(e)s</TabsTrigger>
                            <TabsTrigger value="photos" className="py-2 px-4 text-white hover:bg-gray-200">Photos</TabsTrigger>
                            <TabsTrigger value="videos" className="py-2 px-4 text-white hover:bg-gray-200">Vidéos</TabsTrigger>
                        </TabsList>

                        <TabsContent value="profile">
                            <UpdateFrofile />
                        </TabsContent>

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
        </>
    );
}