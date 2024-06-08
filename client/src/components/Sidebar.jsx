import { Users, Bookmark, Grid, Video, Newspaper, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useAuth from '../hooks/useAuth';

export default function Sidebar() {
    // state (état, données) de l'application
    const { user } = useAuth();

    // comportement


    const imageURL = user.image ? `http://localhost:3000/${user.image}` : "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";
    // affichage (render)
    return (
        <aside className="w-96 bg-slate-800 h-screen p-4 fixed top-16 left-0 text-gray-400">
            <div className="flex items-center mb-8 mt-6 space-x-4">
                <Avatar className="w-10 h-10">
                    <AvatarImage src={imageURL} alt="User Avatar" />
                </Avatar>
                <span className="text-xl font-bold font-serif text-white">{user.firstname}</span>
            </div>
            <nav className="space-y-5 mx-1">
                <Link to="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                    <Users size={30} />
                    <span className="text-lg">Ami(e)s</span>
                </Link>

                <Link to="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                    <Bookmark size={30} />
                    <span className="text-lg">Enregistrements</span>
                </Link>
                <Link to="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                    <Grid size={30} />
                    <span className="text-lg">Groupes</span>
                </Link>
                <Link to="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                    <Video size={30} />
                    <span className="text-lg">Vidéo</span>
                </Link>
                <Link to="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                    <Newspaper size={30} />
                    <span className="text-lg">Fils</span>
                </Link>
                <Link to="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                    <Calendar size={30} />
                    <span className="text-lg">Évènements</span>
                </Link>
            </nav>
        </aside>
    );
}
