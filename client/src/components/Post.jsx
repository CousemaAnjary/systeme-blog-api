import { useState } from "react";
import { ThumbsUp, ThumbsDown, Smile, Frown, Heart, MessageSquare } from "lucide-react"; // Import des icônes

export default function Post() {
    const user = {
        name: 'John Doe',
        avatar: 'https://example.com/avatar.jpg',
        timestamp: 'Il y a 5 minutes',
    };

    const comments = [
        {
            user: {
                name: 'Jane Doe',
                avatar: 'https://example.com/avatar2.jpg',
                timestamp: 'Il y a 2 heures',
            },
            content: 'Super post !',
        },
        {
            user: {
                name: 'Laura Tornado',
                avatar: 'https://example.com/avatar3.jpg',
                timestamp: 'Il y a 3 heures',
            },
            content: 'Je l\'adore, il ressemble à un ancien Grec',
        },
        {
            user: {
                name: 'KaBur Timor Ori',
                avatar: 'https://example.com/avatar4.jpg',
                timestamp: 'Il y a 1 jour',
            },
            content: 'C\'est en fait la meilleure reprise de cette chanson que j\'ai jamais écoutée.',
        },
    ];

    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [showReactions, setShowReactions] = useState(false); // État pour afficher les réactions
    const [reaction, setReaction] = useState(""); // État pour la réaction sélectionnée

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim() !== "") {
            // Add new comment logic here
            console.log("New Comment:", newComment);
            setNewComment(""); // Reset comment input
        }
    };

    const handleReactionClick = (selectedReaction) => {
        setReaction(selectedReaction);
        setShowReactions(false); // Masquer les réactions après la sélection
    };

    const getReactionIcon = () => {
        switch (reaction) {
            case "J’aime":
                return <ThumbsUp size={20} className="text-blue-500" />;
            case "J’adore":
                return <Heart size={20} className="text-red-500" />;
            case "Haha":
                return <Smile size={20} className="text-yellow-500" />;
            case "Triste":
                return <Frown size={20} className="text-blue-700" />;
            case "Grrr":
                return <ThumbsDown size={20} className="text-red-700" />;
            default:
                return null;
        }
    };

    const getReactionText = () => {
        switch (reaction) {
            case "J’aime":
                return "J’aime";
            case "J’adore":
                return "J’adore";
            case "Haha":
                return "Haha";
            case "Triste":
                return "Triste";
            case "Grrr":
                return "Grrr";
            default:
                return "J’aime";
        }
    };

    const getTextColor = () => {
        switch (reaction) {
            case "J’aime":
                return "text-blue-500";
            case "J’adore":
                return "text-red-500";
            case "Haha":
                return "text-yellow-500";
            case "Triste":
                return "text-blue-700";
            case "Grrr":
                return "text-red-700";
            default:
                return "text-gray-400 hover:text-blue-500";
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center space-x-4">
                <img className="w-10 h-10 rounded-full" src={user.avatar} alt={`${user.name} Avatar`} />
                <div>
                    <h4 className="font-bold">{user.name}</h4>
                    <p className="text-gray-500 text-sm">{user.timestamp}</p>
                </div>
            </div>
            <p className="mt-4">Une courte histoire d'amour 😆</p>
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
                                <button onClick={() => handleReactionClick("J’aime")} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                                    <ThumbsUp size={20} className="text-blue-500" />
                                </button>
                                <button onClick={() => handleReactionClick("J’adore")} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                                    <Heart size={20} className="text-red-500" />
                                </button>
                                <button onClick={() => handleReactionClick("Haha")} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                                    <Smile size={20} className="text-yellow-500" />
                                </button>
                                <button onClick={() => handleReactionClick("Triste")} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                                    <Frown size={20} className="text-blue-700" />
                                </button>
                                <button onClick={() => handleReactionClick("Grrr")} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                                    <ThumbsDown size={20} className="text-red-700" />
                                </button>
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
                <div className="text-gray-500 text-sm">{comments.length} commentaires · 6600 j’aime</div>
            </div>
            {showComments && (
                <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                    {comments.map((comment, index) => (
                        <div key={index} className="bg-white p-2 rounded-lg mb-2 shadow-sm">
                            <div className="flex items-center space-x-2">
                                <img className="w-8 h-8 rounded-full" src={comment.user.avatar} alt={`${comment.user.name} Avatar`} />
                                <div>
                                    <h5 className="font-bold">{comment.user.name}</h5>
                                    <p className="text-gray-500 text-xs">{comment.user.timestamp}</p>
                                </div>
                            </div>
                            <p className="mt-2">{comment.content}</p>
                        </div>
                    ))}
                    <div className="flex items-center space-x-4 mt-2">
                        <img className="w-8 h-8 rounded-full" src={user.avatar} alt={`${user.name} Avatar`} />
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
