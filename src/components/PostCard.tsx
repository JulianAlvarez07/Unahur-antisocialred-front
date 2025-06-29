import CommentCard from "./CommentCard";

interface PostCardProps {
    content: string;
    user: {
        nickName: string;
    }
    comments: {
        userId: number;
        contenido: string;
    }[]
    //tags: string[];
    //timestamp?: string;
}

const PostCard = ({ user, content, comments }: PostCardProps) => {


    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-4 max-w-2xl mx-auto">
            {/* Cabecera con nombre de usuario */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                            {user.nickName.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{user.nickName}</h3>
                    </div>
                </div>
            </div>

            {/* Cuerpo con texto */}
            <div className="mb-4">
                <p className="text-gray-800 leading-relaxed">{content}</p>
            </div>

            {/* Sección de comentarios */}
            <div className="pt-3 border-t border-gray-100">
                <h4 className="font-semibold text-gray-700 mb-3">Comentarios</h4>
                {comments && comments.length > 0 ? (
                    <div className="space-y-3">
                        {comments.map((comment, index) => (
                            <CommentCard
                                key={index}
                                comment={comment}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">No hay comentarios aún</p>
                )}
            </div>
        </div>
    );
};

export default PostCard; 