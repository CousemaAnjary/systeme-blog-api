import { Camera, Video, Smile } from "lucide-react";

export default function CreatePost() {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center space-x-4">
                <img className="w-10 h-10 rounded-full" src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" alt="User Avatar" />
                <input type="text" placeholder="Quoi de neuf, Cousema ?" className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none" />
            </div>
            <div className="flex justify-between mt-4">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500">
                    <Video size={20} />
                    <span>Vidéo en direct</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-green-500">
                    <Camera size={20} />
                    <span>Photo/vidéo</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-yellow-500">
                    <Smile size={20} />
                    <span>Humeur/activité</span>
                </button>
            </div>
        </div>
    );
}
