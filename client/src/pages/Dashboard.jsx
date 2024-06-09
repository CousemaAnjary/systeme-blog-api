import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CreatePost from "@/components/CreatePost";
import Post from "@/components/Post";

const Dashboard = () => {
   

    return (
        <div className="bg-gray-200 min-h-screen">
            <Navbar />
            <Sidebar />
            <main className="ml-96 ">
                <div className="container mx-auto p-16">
                    <CreatePost />
                    <Post />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
