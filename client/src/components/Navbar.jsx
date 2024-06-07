import { Key, LogOut, Settings, User, Users, MessageSquareMore, Search, Home, Bell, Video } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';



export default function Navbar() {
    // state (état, données) de l'application
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { user } = useAuth();

    // comportement
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');

        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    // affichage (render)
    return (
        <nav className="bg-gray-800 p-3 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo and Search */}
                <div className="flex items-center space-x-4">
                    <Link to="/admin/dashboard" className="text-2xl font-bold font-serif text-white">Friendzy</Link>
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Rechercher sur Friendzy"
                            className="rounded-full bg-gray-700 text-white pl-10 pr-4 py-2"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                </div>

                {/* Navigation Icons */}
                <div className="flex items-center space-x-6 text-gray-400">
                    <Link to="/admin/dashboard" className="text-white px-11 py-3 ">
                        <Home size={26} />
                    </Link>
                    <Link to="/#" className="hover:text-white px-10 py-3 rounded-full hover:bg-white hover:bg-opacity-10">
                        <Video size={26} />
                    </Link>
                    <Link to="/#" className="hover:text-white px-10 py-3 rounded-full hover:bg-white hover:bg-opacity-10">
                        <Users size={26} />
                    </Link>

                </div>
                {/* User Options */}
                <div className="flex items-center space-x-4">

                    <Link to="/#" className="relative text-white px-2 py-2">
                        <MessageSquareMore size={22} />
                    </Link>

                    <Link to="/#" className="relative text-white px-2 py-2">
                        <Bell size={22} />
                        {/* <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">1</span> */}
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src="https://img.myloview.com.br/posters/user-icon-human-person-symbol-avatar-login-sign-700-258992648.jpg" alt="User" />
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Salut👋   {user.firstName}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <Link to="/admin/profile">
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span> Profile</span>
                                    </DropdownMenuItem>
                                </Link>
                                <Link to="#">
                                    <DropdownMenuItem>
                                        <Key className="mr-2 h-4 w-4" />
                                        <span>Modifier mot de passe</span>
                                    </DropdownMenuItem>
                                </Link>
                                <Link to="#">
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Paramètres</span>
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Déconnexion</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}
