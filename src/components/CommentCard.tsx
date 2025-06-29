interface CommentCardProps {
    comment: {
        userId: number;
        contenido: string;
    }
}

const CommentCard = ({ comment }: CommentCardProps) => {
    console.log("CommentCard recibió:", comment);

    return (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start space-x-3">
                {/* Avatar del usuario del comentario */}
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">
                        U{comment.userId}
                    </span>
                </div>

                {/* Contenido del comentario */}
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm text-gray-700">
                            Usuario {comment.userIdComment} //TODO borrar usuario hardcodeado
                        </span>
                    </div>
                    <p className="text-gray-800 text-sm leading-relaxed">
                        {comment.comentario}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CommentCard;