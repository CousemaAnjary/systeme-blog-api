import { Users, Clock, Bookmark, Grid, Video, ShoppingBag, Newspaper, Calendar, BarChart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Sidebar() {
    const user = {
        name: "Cousema Abdillah",
        avatar: "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    };

    return (
        <aside className="w-96 bg-slate-800 h-screen p-4 fixed top-16 left-0 text-gray-400">
            <div className="flex items-center mb-8 mt-6 space-x-4">
                <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} alt="User Avatar" />
                </Avatar>
                <span className="text-xl font-bold font-serif text-white">{user.name}</span>
            </div>
            <nav className="space-y-5 mx-1">
                <Link to="/friends" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                    <Users size={30} />
                    <span className="text-lg">Ami(e)s</span>
                </Link>
                
                <Link to="/saved" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                    <Bookmark size={30} />
                    <span className="text-lg">Enregistrements</span>
                </Link>
                <Link to="/groups" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                    <Grid size={30} />
                    <span className="text-lg">Groupes</span>
                </Link>
                <Link to="/videos" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                    <Video size={30} />
                    <span className="text-lg">Vidéo</span>
                </Link> 
                <Link to="/feed" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                    <Newspaper size={30} />
                    <span className="text-lg">Fils</span>
                </Link>
                <Link to="/events" className="flex items-center space-x-2 text-gray-400 hover:text-white">
                    <Calendar size={30} />
                    <span className="text-lg">Évènements</span>
                </Link>
            </nav>
        </aside>
    );
}
