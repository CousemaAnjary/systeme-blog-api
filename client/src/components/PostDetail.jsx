import { fr } from 'date-fns/locale'
import { Button } from "./ui/button"
import useAuth from '../hooks/useAuth'
import { ThumbsUp } from "lucide-react"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from 'date-fns'
import { toggleLike } from "@/services/likeService"
import { useParams, useNavigate } from 'react-router-dom'
import { getPublication } from "@/services/publicationService"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { createCommentaire, getCommentaires } from "@/services/commentaireService"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"


const PostDetail = () => {
    /**
     * ! STATE (état, données) de l'application
     */
    const navigate = useNavigate()
    const { user } = useAuth()
    const { id } = useParams()

    const [post, setPost] = useState('')
    const [likes, setLikes] = useState(0)
    const [liked, setLiked] = useState(false)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    // Données à envoyer pour le like
     const dataLike = { user_id: user.userId, publication_id: post.id, }

    // Données à envoyer pour la création du commentaire
    const dataCommentaire = { user_id: user.userId, publication_id: post.id, content: newComment }



    /**
    * ! COMPORTEMENT (méthodes, fonctions) de l'application
    */
    useEffect(() => {
        const fetchPublication = async () => {
            try {
                // Récupérer la publication depuis l'API
                const dataPublication = await getPublication(id)
                setPost(dataPublication) // Mettre à jour le state avec la publication
                setLikes(dataPublication.likes || 0) // Mettre à jour le state avec le nombre de likes
                setLiked(dataPublication.liked) // Mettre à jour le state avec le statut du like

            } catch (error) {
                console.error('Erreur lors de la récupération de la publication:', error)
            }
        }

        const fetchComments = async () => {
            try {
                // Récupérer les commentaires depuis l'API
                const commentData = await getCommentaires(id)
                setComments(commentData) // Mettre à jour le state avec les commentaires

            } catch (error) {
                console.error('Erreur lors de la récupération des commentaires:', error);
            }
        }

        fetchPublication() // Appeler la fonction pour récupérer la publication
        fetchComments() // Appeler la fonction pour récupérer les commentaires
    }, [id]) // [id] pour exécuter le code à chaque changement de l'identifiant de la publication


    const handleCreateComment = async (e) => {
        // Empêcher le rechargement de la page
        e.preventDefault()

        try {
            const response = await createCommentaire(dataCommentaire)
            const comment = {
                user: {
                    image: user.image,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    createdAt: "à l'instant"

                },
                content: response.commentaire.content
            }
            setComments([...comments, comment])
            setNewComment('') // Réinitialiser le champ de commentaire

        } catch (err) {
            // Afficher le message d'erreur
            console.error('Erreur lors de la création du commentaire:', err)
        }

    }

    const handleLikeClick = async () => {
        try {
            // Appel à l'API pour gérer le like
            const response = await toggleLike(dataLike) 
            setLikes(response.likes ? likes + 1 : likes - 1) // Mettre à jour le state avec le nombre de likes
            setLiked(response.liked) // Mettre à jour le state avec le statut du like

        } catch (error) {
            console.error('Erreur lors de la gestion du like:', error)
        }
    }


    const handleCommentChange = (e) => setNewComment(e.target.value)

    /**
    * ! AFFICHAGE (render) de l'application
    */
    return (
        <div className="bg-gray-200 min-h-screen p-4">
            <button onClick={() => navigate(-1)} className="text-blue-500 mb-4">← Retour au blog</button>
            <Card className="shadow-md">
                {post.image && <img src={`http://localhost:3000/${post.image}`} alt="Publication" className="rounded-t-lg w-full h-64 object-cover mb-4" />}
                <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                        <Avatar>
                            <AvatarImage src={`http://localhost:3000/${post.user?.image}`} />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-bold">{post.user?.firstname}</h4>
                            <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString('fr-FR', {
                                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                            })}</p>
                        </div>
                    </div>
                    <Badge className="inline-block px-3 py-1 text-sm font-semibold text-pink-800 bg-pink-200 rounded-full mb-4">{post.category}</Badge>
                    <CardTitle className="text-2xl font-bold mb-4">{post.title}</CardTitle>
                    <CardDescription className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={handleLikeClick} className="flex items-center space-x-1 text-gray-400 hover:text-blue-500">
                            <ThumbsUp size={20} className={liked ? 'text-blue-500' : ''} />
                            <span>{likes} J’aime</span>
                        </button>
                        <div className="text-gray-500">{comments.length} commentaires</div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        {comments.map((comment, index) => (
                            <div key={index} className="bg-white p-2 rounded-lg mb-2 shadow-sm">
                                <div className="flex items-center space-x-2">
                                    <Avatar>
                                        <AvatarImage className="w-8 h-8 rounded-full" src={`http://localhost:3000/${comment.user?.image}`} />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h5 className="font-bold">{comment.user?.firstname} {comment.user?.lastname}</h5>
                                        <p className="text-gray-500 text-xs">
                                            {comment.createdAt}
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-2">{comment.content}</p>
                            </div>
                        ))}
                        <div className="flex items-center space-x-4 mt-2">
                            <Avatar>
                                <AvatarImage className="w-8 h-8 rounded-full" src={`http://localhost:3000/${user?.image}`} alt="Votre Avatar" />
                                <AvatarFallback>AV</AvatarFallback>
                            </Avatar>
                            <textarea
                                placeholder="Écrivez un commentaire..."
                                className="flex-1 bg-gray-200 rounded-full px-4 py-2 outline-none"
                                value={newComment}
                                onChange={handleCommentChange}
                                rows="1"
                            />
                            <Button
                                className="bg-blue-500 text-white rounded-full"
                                onClick={handleCreateComment}
                            >
                                Envoyer
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PostDetail;


