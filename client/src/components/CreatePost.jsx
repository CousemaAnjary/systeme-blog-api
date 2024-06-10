import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Camera, Smile } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export default function CreatePost() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const imageURL = user.image ? `http://localhost:3000/${user.image}` : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";

    const openCreatePostPage = () => {
        navigate('/admin/createPost');
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage src={imageURL} alt="User Avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <Input
                    type="text"
                    placeholder={`Quoi de neuf, ${user.firstname} ?`}
                    className="bg-gray-100 rounded-full cursor-pointer"
                    onClick={openCreatePostPage}
                    readOnly
                />
            </div>

            <div className="flex justify-between mt-4">
                <Button variant="link" className="space-x-2 text-gray-400 hover:text-green-500">
                    <Camera size={20} />
                    <span>Photo/vidéo</span>
                </Button>

                <Button variant="link" className="space-x-2 text-gray-400 hover:text-yellow-500">
                    <Smile size={20} />
                    <span>Humeur/activité</span>
                </Button>
            </div>
        </div>
    );
}
