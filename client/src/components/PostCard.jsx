import { useNavigate } from 'react-router-dom';
import { ThumbsUp, MessageSquare } from "lucide-react";

const PostCard = ({ title, category, content, image, userImage, userName, commentsCount, likesCount }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/admin/showPost`);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={handleClick}>
            <div className="flex items-center space-x-4 mb-4">
                <img className="w-10 h-10 rounded-full" src={userImage} alt={`${userName} Avatar`} />
                <div>
                    <h4 className="font-bold">{userName}</h4>
                </div>
            </div>
            {image && <img src={image} alt="Publication" className="rounded-lg w-full h-48 object-cover" />}
            <div className="p-4">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-pink-800 bg-pink-200 rounded-full">{category}</span>
                <h2 className="mt-2 text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-gray-600">{content}</p>
            </div>
            <div className="flex justify-between mt-4">
                <div className="flex items-center space-x-2 text-gray-500">
                    <ThumbsUp size={20} />
                    <span>{likesCount}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                    <MessageSquare size={20} />
                    <span>{commentsCount}</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
