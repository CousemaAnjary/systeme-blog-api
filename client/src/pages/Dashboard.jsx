import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CreatePost from "@/components/CreatePost";
import Post from "@/components/Post";

const Dashboard = () => {
    const posts = [
        {
            user: { name: 'John Doe', avatar: 'https://example.com/avatar.jpg', timestamp: 'Il y a 5 minutes' },
            content: 'Une courte histoire d\'amour 😆',
            comments: 111,
            likes: 6600,
        },
        {
            user: { name: 'John Doe', avatar: 'https://example.com/avatar.jpg', timestamp: 'Il y a 5 minutes' },
            content: 'Une courte histoire d\'amour 😆',
            comments: 111,
            likes: 6600,
        },
        {
            user: { name: 'John Doe', avatar: 'https://example.com/avatar.jpg', timestamp: 'Il y a 5 minutes' },
            content: 'Une courte histoire d\'amour 😆',
            comments: 111,
            likes: 6600,
        },
        {
            user: { name: 'John Doe', avatar: 'https://example.com/avatar.jpg', timestamp: 'Il y a 5 minutes' },
            content: 'Une courte histoire d\'amour 😆',
            comments: 111,
            likes: 6600,
        },
        {
            user: { name: 'John Doe', avatar: 'https://example.com/avatar.jpg', timestamp: 'Il y a 5 minutes' },
            content: 'Une courte histoire d\'amour 😆',
            comments: 111,
            likes: 6600,
        },
        {
            user: { name: 'John Doe', avatar: 'https://example.com/avatar.jpg', timestamp: 'Il y a 5 minutes' },
            content: 'Une courte histoire d\'amour 😆',
            comments: 111,
            likes: 6600,
        },
        {
            user: { name: 'John Doe', avatar: 'https://example.com/avatar.jpg', timestamp: 'Il y a 5 minutes' },
            content: 'Une courte histoire d\'amour 😆',
            comments: 111,
            likes: 6600,
        },
        {
            user: { name: 'John Doe', avatar: 'https://example.com/avatar.jpg', timestamp: 'Il y a 5 minutes' },
            content: 'Une courte histoire d\'amour 😆',
            comments: 111,
            likes: 6600,
        },
        // Ajoutez d'autres publications ici...
    ];

    return (
        <div className="bg-gray-200 min-h-screen">
            <Navbar />
            <Sidebar />
            <main className="ml-96 ">
                <div className="container mx-auto p-16">
                    <CreatePost />
                    {posts.map((post, index) => (
                        <Post key={index} {...post} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
