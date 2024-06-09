import { useState } from "react";
import Navbar from "@/components/Navbar";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";

const staticPosts = [
    {
        title: "Des super sushis que j’ai mangé dans le sud du Japon",
        category: "Cuisine",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/14/46/be/e7/sousi.jpg",
        userImage: "https://img.freepik.com/psd-gratuit/personne-celebrant-son-orientation-sexuelle_23-2150115662.jpg",
        userName: "John Doe",
        comments: [
            {
                user: {
                    avatar: "https://example.com/avatar1.jpg",
                    name: "Jane Doe",
                    timestamp: "Il y a 2 heures"
                },
                content: "Super publication !"
            },
            {
                user: {
                    avatar: "https://example.com/avatar2.jpg",
                    name: "John Smith",
                    timestamp: "Il y a 3 heures"
                },
                content: "J'adore cette photo."
            }
        ],
        likes: 45
    },
    // Ajoutez plus de publications ici...
];

const Dashboard = () => {
    const [posts] = useState(staticPosts);

    return (
        <div className="bg-gray-200 min-h-screen">
            <Navbar />
            <main className="container mx-auto p-16">
                <CreatePost />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                        <PostCard key={index} {...post} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
