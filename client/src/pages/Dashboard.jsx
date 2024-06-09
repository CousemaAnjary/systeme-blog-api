import Navbar from "@/components/Navbar";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import { useState } from "react";

const Dashboard = () => {
    const [posts] = useState([
        {
            title: "Des super sushis que j’ai mangé dans le sud du Japon",
            category: "Cuisine",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ...",
            image: "/path/to/sushi.jpg",
            userImage: "https://example.com/user1.jpg",
            userName: "John Doe",
            commentsCount: 2,
            likesCount: 45
        },
        {
            title: "Jump dans la vie, ou alors jump dans l'eau",
            category: "Loisirs",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ...",
            image: "/path/to/jump.jpg",
            userImage: "https://example.com/user2.jpg",
            userName: "Jane Doe",
            commentsCount: 3,
            likesCount: 30
        },
        {
            title: "Jardiner pour s’aérer la tête et profiter de la nature",
            category: "Jardinage",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ...",
            image: "/path/to/gardening.jpg",
            userImage: "https://example.com/user3.jpg",
            userName: "Jim Doe",
            commentsCount: 4,
            likesCount: 60
        },
        {
            title: "Un paysage à couper le souffle en Italie",
            category: "Voyage",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ...",
            image: "/path/to/italy.jpg",
            userImage: "https://example.com/user4.jpg",
            userName: "Jack Doe",
            commentsCount: 1,
            likesCount: 20
        }
    ]);

    return (
        <div className="bg-gray-200 min-h-screen">
            <Navbar />
            <main className="container mx-auto p-16">
                <CreatePost />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                        <PostCard
                            key={index}
                            title={post.title}
                            category={post.category}
                            content={post.content}
                            image={post.image}
                            userImage={post.userImage}
                            userName={post.userName}
                            commentsCount={post.commentsCount}
                            likesCount={post.likesCount}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
