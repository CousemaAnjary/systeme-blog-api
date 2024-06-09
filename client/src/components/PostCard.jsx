import { useNavigate } from 'react-router-dom';
import { ThumbsUp, MessageSquare } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card";
 
 
  
  
  
  


const PostCard = ({ title, category, content, image, userImage, userName, likes, comments }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/admin/showPost`);
    };

    return (
        <Card className="shadow-md">
            {image && <img src={image} alt="Publication" className="rounded-t-lg w-full h-48 object-cover cursor-pointer" onClick={handleClick} />}
            <CardContent>
                <div className="flex items-center space-x-2 mb-2 mt-2">
                    <Avatar>
                        <AvatarImage src={userImage} alt="User Avatar" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-lg font-semibold">{userName}</div>
                </div>

                <Badge className=" px-3 py-1 bg-pink-600 font-bold  mt-2 ">{category}</Badge>
                <CardTitle className="mt-2">{title}</CardTitle>
                <CardDescription className="leading-7 mt-2">{content}</CardDescription>

                <div className="flex justify-between items-center mt-4">
                    <button className="flex items-center space-x-1 text-gray-400">
                        <ThumbsUp size={20} />
                        <span>{likes} J’aime</span>
                    </button>
                    <div className="flex items-center space-x-1 text-gray-400">
                        <MessageSquare size={20} />
                        <span>{comments.length} commentaires</span>
                    </div>
                </div>
            </CardContent>
        </Card>



    );
};

export default PostCard;
