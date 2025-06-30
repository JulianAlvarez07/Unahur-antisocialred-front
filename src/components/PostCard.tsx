import CommentCard from "./CommentCard";
import { UserForComponent, CommentForComponent } from "@/types/interfaces";
import CommentForm from "./CommentForm";

interface PostCardProps {
    content: string;
    user: UserForComponent;
    comments: CommentForComponent[];
    postId: number;
}

const PostCard = ({ user, content, comments, postId }: PostCardProps) => {
    console.log(postId, 'desde postcard');

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3 md:p-6 mb-4 w-full">
            {/* Cabecera con nombre de usuario */}
            <div className="flex items-center justify-between mb-3 md:mb-4 pb-2 md:pb-3 border-b border-gray-100">
                <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs md:text-sm">
                            {user.nickName.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base">{user.nickName}</h3>
                    </div>
                </div>
            </div>

            {/* Cuerpo con texto */}
            <div className="mb-3 md:mb-4">
                <p className="text-gray-800 leading-relaxed text-sm md:text-base break-words">{content}</p>
            </div>

            {/* Sección de comentarios */}
            <div className="pt-2 md:pt-3 border-t border-gray-100">
                <CommentForm postId={postId} />
                <h4 className="font-semibold text-gray-700 mb-2 md:mb-3 text-sm md:text-base">
                    Comentarios {comments && comments.length > 0 && `(${comments.length})`}
                </h4>
                {comments && comments.length > 0 ? (
                    <div className="space-y-2 md:space-y-3">
                        {comments.map((comment, index) => (
                            <CommentCard
                                key={index}
                                comment={comment}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-xs md:text-sm italic">No hay comentarios aún</p>
                )}
            </div>
        </div>
    );
};

export default PostCard; 