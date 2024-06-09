import Navbar from "@/components/Navbar";
import PostDetail from "@/components/PostDetail";

const ShowPost = () => {
    return (
        <div className="bg-gray-200 min-h-screen">
            <Navbar />
            <main className="container mx-auto p-8">
                <PostDetail />
            </main>
        </div>
    );
};

export default ShowPost;
