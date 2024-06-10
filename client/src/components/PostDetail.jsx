import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { ThumbsUp, MessageSquare } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { getPublication } from "@/services/publicationService";
import useAuth from '../hooks/useAuth';

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [post, setPost] = useState(null);
    const [likes, setLikes] = useState(0);

    const staticComments = [
        {
            user: {
                avatar: "https://example.com/avatar1.jpg",
                name: "Jane Doe",
                timestamp: "Il y a 2 heures"
            },
            content: "Super publication !"
        },
        {
            user: {
                avatar: "https://example.com/avatar2.jpg",
                name: "John Smith",
                timestamp: "Il y a 3 heures"
            },
            content: "J'adore cette photo."
        }
    ];

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPublication(id);
                setPost(data.publication);
                setLikes(data.publication.likes || 0);
            } catch (error) {
                console.error('Erreur lors de la récupération de la publication:', error);
            }
        };

        fetchPost();
    }, [id]);

    const handleLikeClick = () => setLikes(likes + 1);

    if (!post) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="bg-gray-200 min-h-screen p-4">
            <button onClick={() => navigate(-1)} className="text-blue-500 mb-4">← Retour au blog</button>
            <Card className="shadow-md">
                {post.image && <img src={`http://localhost:3000/${post.image}`} alt="Publication" className="rounded-t-lg w-full h-64 object-cover mb-4" />}
                <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                        <Avatar>
                            <AvatarImage src={`http://localhost:3000/${post.user.image}`} alt={`${post.user.firstname} Avatar`} />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-bold">{post.user.firstname}</h4>
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
                            <ThumbsUp size={20} />
                            <span>{likes} J’aime</span>
                        </button>
                        <div className="text-gray-500">{staticComments.length} commentaires</div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        {staticComments.map((comment, index) => (
                            <div key={index} className="bg-white p-2 rounded-lg mb-2 shadow-sm">
                                <div className="flex items-center space-x-2">
                                    <Avatar>
                                        <AvatarImage className="w-8 h-8 rounded-full" src={comment.user.avatar} alt={`${comment.user.name} Avatar`} />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h5 className="font-bold">{comment.user.name}</h5>
                                        <p className="text-gray-500 text-xs">{comment.user.timestamp}</p>
                                    </div>
                                </div>
                                <p className="mt-2">{comment.content}</p>
                            </div>
                        ))}
                        <div className="flex items-center space-x-4 mt-2">
                            <Avatar>
                                <AvatarImage className="w-8 h-8 rounded-full" src={`http://localhost:3000/${user.image}`} alt="Votre Avatar" />
                                <AvatarFallback>AV</AvatarFallback>
                            </Avatar>
                            <textarea
                                placeholder="Écrivez un commentaire..."
                                className="flex-1 bg-gray-200 rounded-full px-4 py-2 outline-none"
                                rows="1"
                            />
                            <Button
                                className="bg-blue-500 text-white rounded-full"
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
