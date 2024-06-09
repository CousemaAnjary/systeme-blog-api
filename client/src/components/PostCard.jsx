import { useNavigate } from 'react-router-dom';
import { ThumbsUp, MessageSquare } from "lucide-react";

const PostCard = ({ title, category, content, image, userImage, userName, comments = [], likes = 0 }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/admin/showPost`);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={handleClick}>
            {image && <img src={image} alt="Publication" className="rounded-t-lg w-full h-48 object-cover" />}
            <div className="p-4">
                <div className="flex items-center space-x-2">
                    <img className="w-10 h-10 rounded-full" src={userImage} alt={`${userName} Avatar`} />
                    <div>
                        <h4 className="font-bold">{userName}</h4>
                    </div>
                </div>
                <span className="inline-block px-3 py-1 text-sm font-semibold text-pink-800 bg-pink-200 rounded-full mt-2">{category}</span>
                <h2 className="mt-2 text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-gray-600">{content}</p>
                <div className="flex justify-between items-center mt-4">
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-500">
                        <ThumbsUp size={20} />
                        <span>{likes} J’aime</span>
                    </button>
                    <div className="flex items-center space-x-1 text-gray-400">
                        <MessageSquare size={20} />
                        <span>{comments.length} commentaires</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
