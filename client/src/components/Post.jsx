export default function Post({ user, content, comments, likes }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center space-x-4">
                <img className="w-10 h-10 rounded-full" src={user.avatar} alt={`${user.name} Avatar`} />
                <div>
                    <h4 className="font-bold">{user.name}</h4>
                    <p className="text-gray-500 text-sm">{user.timestamp}</p>
                </div>
            </div>
            <p className="mt-4">{content}</p>
            <div className="mt-4 flex justify-between items-center">
                <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-500">
                        <span>J’aime</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-500">
                        <span>Commenter</span>
                    </button>
                </div>
                <div className="text-gray-500 text-sm">{comments} commentaires · {likes} j’aime</div>
            </div>
        </div>
    );
}
