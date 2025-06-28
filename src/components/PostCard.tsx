interface PostCardProps {
    content: string;
    user: {
        nickName: string;
    }
    //tags: string[];
    //timestamp?: string;
}

const PostCard = ({ user, content }: PostCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-4 max-w-2xl mx-auto">
            {/* Cabecera con nombre de usuario */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                            {user.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <h3>{user}</h3>
                    {/* <div>
                        <h3 className="font-semibold text-gray-900">{username}</h3>
                        {timestamp && (
                            <p className="text-sm text-gray-500">{timestamp}</p>
                        )}
                    </div> */}
                </div>
            </div>

            {/* Cuerpo con texto */}
            <div className="mb-4">
                <p className="text-gray-800 leading-relaxed">{content}</p>
            </div>

            {/* Apartado para tags */}
            {/*  <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                    >
                        #{tag}
                    </span>
                ))}
            </div> */}
        </div>
    );
};

export default PostCard; 