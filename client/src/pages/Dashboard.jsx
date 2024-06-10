import Navbar from "@/components/Navbar";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";

const Dashboard = () => {
    return (
        <div className="bg-gray-200 min-h-screen">
            <Navbar />
            <main className="container mx-auto p-16">
                <CreatePost />
                <PostCard />
            </main>
        </div>
    );
};

export default Dashboard;
