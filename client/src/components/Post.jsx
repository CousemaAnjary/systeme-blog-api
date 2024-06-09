import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Smile, Frown, Heart, MessageSquare } from "lucide-react";
import useAuth from '../hooks/useAuth';
import { getPublications } from '../services/publicationService';

export default function Post() {
    const { user } = useAuth();
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const data = await getPublications();
                setPublications(data.publications);
            } catch (error) {
                console.error('Error fetching publications:', error);
            }
        };

        fetchPublications();
    }, []);

    return (
        <div>
            {publications.map(publication => (
                <PublicationCard key={publication.id} publication={publication} user={user} />
            ))}
        </div>
    );
}

function PublicationCard({ publication, user }) {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [showReactions, setShowReactions] = useState(false);
    const [reaction, setReaction] = useState("");

    const staticComments = [
        {
            user: {
                avatar: 'https://example.com/avatar1.jpg',
                name: 'John Doe',
                timestamp: 'Il y a 2 heures'
            },
            content: 'Super publication !'
        },
        {
            user: {
                avatar: 'https://example.com/avatar2.jpg',
                name: 'Jane Doe',
                timestamp: 'Il y a 3 heures'
            },
            content: 'J\'adore cette photo.'
        }
    ];

    const staticReactionsCount = 45;

    const toggleComments = () => setShowComments(!showComments);

    const handleCommentChange = (e) => setNewComment(e.target.value);

    const handleCommentSubmit = () => {
        if (newComment.trim() !== "") {
            console.log("New Comment:", newComment);
            setNewComment("");
        }
    };

    const handleReactionClick = (selectedReaction) => {
        setReaction(selectedReaction);
        setShowReactions(false);
    };

    const getReactionIcon = () => {
        switch (reaction) {
            case "J’aime": return <ThumbsUp size={20} className="text-blue-500" />;
            case "J’adore": return <Heart size={20} className="text-red-500" />;
            case "Haha": return <Smile size={20} className="text-yellow-500" />;
            case "Triste": return <Frown size={20} className="text-blue-700" />;
            case "Grrr": return <ThumbsDown size={20} className="text-red-700" />;
            default: return null;
        }
    };

    const getReactionText = () => {
        return reaction || "J’aime";
    };

    const getTextColor = () => {
        switch (reaction) {
            case "J’aime": return "text-blue-500";
            case "J’adore": return "text-red-500";
            case "Haha": return "text-yellow-500";
            case "Triste": return "text-blue-700";
            case "Grrr": return "text-red-700";
            default: return "text-gray-400 hover:text-blue-500";
        }
    };

    const imageURL = user.image ? `http://localhost:3000/${user.image}` : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center space-x-4">
                <img className="w-10 h-10 rounded-full" src={`http://localhost:3000/${publication.user.image}`} alt={`${publication.user.firstname} Avatar`} />
                <div>
                    <h4 className="font-bold">{publication.user.firstname}</h4>
                    <p className="text-gray-500 text-sm">{new Date(publication.createdAt).toLocaleString()}</p>
                </div>
            </div>
            <p className="mt-4">{publication.content}</p>
            {publication.image && <img src={`http://localhost:3000/${publication.image}`} alt="Publication" className="mt-4 rounded-lg w-full" />}
            <div className="mt-4 flex justify-between items-center">
                <div className="relative flex space-x-4">
                    <div className="relative">
                        <button
                            className={`flex items-center space-x-1 ${getTextColor()} relative`}
                            onClick={() => setShowReactions(!showReactions)}
                            style={{ cursor: 'pointer' }}
                        >
                            {reaction ? getReactionIcon() : null}
                            <span>{getReactionText()}</span>
                        </button>
                        {showReactions && (
                            <div className="absolute top-0 left-0 mt-8 flex space-x-2 bg-white p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out transform translate-y-4 opacity-100">
                                {['J’aime', 'J’adore', 'Haha', 'Triste', 'Grrr'].map(r => (
                                    <button key={r} onClick={() => handleReactionClick(r)} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                                        {getReactionIcon(r)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        className="flex items-center space-x-1 text-gray-400 hover:text-gray-500"
                        onClick={toggleComments}
                        style={{ cursor: 'pointer' }}
                    >
                        <MessageSquare size={20} />
                        <span>Commenter</span>
                    </button>
                </div>
                <div className="text-gray-500 text-sm">{staticComments.length} commentaires · {staticReactionsCount} j’aime</div>
            </div>
            {showComments && (
                <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                    {staticComments.map((comment, index) => (
                        <div key={index} className="bg-white p-2 rounded-lg mb-2 shadow-sm">
                            <div className="flex items-center space-x-2">
                                <img className="w-8 h-8 rounded-full" src={comment.user.avatar} alt={`${comment.user.name} Avatar`} />
                                <div>
                                    <h5 className="font-bold">{comment.user.name}</h5>
                                    <p className="text-gray-500 text-xs">{comment.timestamp}</p>
                                </div>
                            </div>
                            <p className="mt-2">{comment.content}</p>
                        </div>
                    ))}
                    <div className="flex items-center space-x-4 mt-2">
                        <img className="w-8 h-8 rounded-full" src={imageURL} alt={`${user.firstname} Avatar`} />
                        <textarea
                            placeholder="Écrivez un commentaire..."
                            className="flex-1 bg-gray-200 rounded-full px-4 py-2 outline-none"
                            value={newComment}
                            onChange={handleCommentChange}
                            rows="1"
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-full"
                            onClick={handleCommentSubmit}
                            style={{ cursor: 'pointer' }}
                        >
                            Envoyer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
