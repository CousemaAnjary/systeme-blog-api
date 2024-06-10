import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, MessageSquare } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { getPublications } from "@/services/publicationService";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const PostCard = () => {
    const [publications, setPublications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const data = await getPublications();
                setPublications(data.publications);
            } catch (error) {
                console.error('Erreur lors de la récupération des publications:', error);
            }
        };

        fetchPublications();
    }, []);

    const handleClick = (id) => {
        navigate(`/admin/showPost/${id}`);
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((post, index) => (
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

                        <Badge className="px-3 py-1 bg-pink-600 font-bold mt-2">{post.category}</Badge>
                        <CardTitle className="mt-2">{post.title}</CardTitle>
                        <CardDescription className="leading-7 mt-2" dangerouslySetInnerHTML={{ __html: truncateText(post.content, 200) }} />
                    </CardContent>
                    <CardFooter className="flex justify-between items-center mt-1">
                        <button className="flex items-center space-x-1 text-gray-400">
                            <ThumbsUp size={20} />
                            <span>45 J’aime</span>
                        </button>
                    
                        <div className="flex items-center space-x-1 text-gray-400">
                            <MessageSquare size={20} />
                            <span>3 commentaires</span>
                            
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default PostCard;
