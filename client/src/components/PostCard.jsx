import { fr } from 'date-fns/locale'
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { ThumbsUp, MessageSquare } from "lucide-react"
import { getPublications } from "@/services/publicationService"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"


export default function PostCard() {
    /**
     * ! STATE (état, données) de l'application
     */
    const navigate = useNavigate()

    const [publications, setPublications] = useState([])
    const [searchTerm, setSearchTerm] = useState('')


    /**
    * ! COMPORTEMENT (méthodes, fonctions) de l'application
    */
    useEffect(() => {
        const fetchPublications = async () => {
            try {
                // Récupérer les publications
                const publicationData = await getPublications()
                setPublications(publicationData.publications) // Mettre à jour le state avec les publications

            } catch (error) {
                console.error('Erreur lors de la récupération des publications:', error)
            }
        }
        fetchPublications() // Appeler la fonction pour récupérer les publications
    }, []) // [] pour exécuter le code une seule fois après le premier rendu

    // Mettre à jour le state searchTerm avec la valeur de l'input de recherche
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    // Filtrer les publications par catégorie
    const filteredPublications = publications.filter((post) =>
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Rediriger vers la page de détails de la publication
    const handleClick = (id) => {
        navigate(`/admin/showPost/${id}`)
    }

    // Tronquer le texte si la longueur dépasse maxLength
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...'
        }
        return text
    }


    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div>
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Rechercher par catégorie Ex: Sport, Technologie, etc."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="rounded-full bg-gray-100 text-gray-800 pl-10 pr-4 py-2 shadow"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPublications.map((post, index) => (

                    <Card key={index} className="shadow-md flex flex-col justify-between">
                        {post.image && <img src={`http://localhost:3000/${post.image}`} alt="Publication" className="rounded-t-lg w-full h-48 object-cover cursor-pointer" onClick={() => handleClick(post.id)} />}
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
                            <button className="flex items-center space-x-1 text-gray-400">
                                <ThumbsUp size={20} />
                                <span>{post.likes} J’aime</span>
                            </button>

                            <div className="flex items-center space-x-1 text-gray-400">
                                <MessageSquare size={20} />
                                <span>{post.comments} commentaires</span>
                            </div>
                        </CardFooter>
                    </Card>

                ))}
            </div>
        </div>
    );
};
