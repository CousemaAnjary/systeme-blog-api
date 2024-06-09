import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { ThumbsUp, MessageSquare } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "./ui/button";

const PostDetail = () => {
    const { title } = useParams();
    const navigate = useNavigate();

    // Données statiques pour le moment, vous pouvez remplacer cela par des données réelles
    const post = {
        title: "Des super sushis que j’ai mangé dans le sud du Japon",
        category: "Cuisine",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere ex non ultricies dapibus. Nam sodales ut ipsum nec scelerisque. In quis viverra turpis. Cras porta, dolor id sagittis molestie, diam dui mattis nisl, ac gravida ligula nunc non justo. Nulla volutpat facilisis semper. Fusce condimentum sem nec turpis congue congue. Nulla porttitor sollicitudin sem, vitae finibus purus varius non.",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/14/46/be/e7/sousi.jpg",
        userImage: "https://img.freepik.com/psd-gratuit/personne-celebrant-son-orientation-sexuelle_23-2150115662.jpg",
        userName: "John Doe",
        createdAt: "03.09.2024",
        comments: [
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
        ],
        likesCount: 45
    };

    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState(post.comments);
    const [likes, setLikes] = useState(post.likesCount);

    const handleCommentChange = (e) => setNewComment(e.target.value);

    const handleCommentSubmit = () => {
        if (newComment.trim() !== "") {
            const newCommentData = {
                user: {
                    avatar: "https://example.com/user1.jpg",
                    name: "Vous",
                    timestamp: "Maintenant"
                },
                content: newComment
            };
            setComments([...comments, newCommentData]);
            setNewComment("");
        }
    };

    const handleLikeClick = () => setLikes(likes + 1);

    return (
        <div className="bg-gray-200 min-h-screen p-8">
            <button onClick={() => navigate(-1)} className="text-blue-500 mb-4">← Retour au blog</button>
            <Card className="shadow-md">
                {post.image && <img src={post.image} alt="Publication" className="rounded-t-lg w-full h-64 object-cover mb-4" />}
                <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                        <Avatar>
                            <AvatarImage src={post.userImage} alt={`${post.userName} Avatar`} />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-bold">{post.userName}</h4>
                            <p className="text-gray-500 text-sm">{post.createdAt}</p>
                        </div>
                    </div>
                    <Badge className="inline-block px-3 py-1 text-sm font-semibold text-pink-800 bg-pink-200 rounded-full mb-4">{post.category}</Badge>
                    <CardTitle className="text-2xl font-bold mb-4">{post.title}</CardTitle>
                    <CardDescription className="text-gray-700 mb-6">{post.content}</CardDescription>
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={handleLikeClick} className="flex items-center space-x-1 text-gray-400 hover:text-blue-500">
                            <ThumbsUp size={20} />
                            <span>{likes} J’aime</span>
                        </button>
                        <div className="text-gray-500">{comments.length} commentaires</div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        {comments.map((comment, index) => (
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
                                <AvatarImage className="w-8 h-8 rounded-full" src="https://example.com/user1.jpg" alt="Votre Avatar" />
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
                                onClick={handleCommentSubmit}
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
