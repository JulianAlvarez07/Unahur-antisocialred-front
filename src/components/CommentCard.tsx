import { CommentForComponent } from "@/types/interfaces";

interface CommentCardProps {
  comment: CommentForComponent;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  // Obtener el nickname del usuario, priorizando el nickname directo sobre el del objeto user
  const displayName =
    comment.nickName || comment.user?.nickName || `Usuario ${comment.userId}`;

  return (
    <div className="bg-gray-50 rounded-lg p-2 md:p-4 border border-gray-200 hover:bg-blue-100 transition-colors">
      <div className="flex items-start space-x-2 md:space-x-3">
        {/* Avatar del usuario del comentario */}
        <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xs">
            {displayName.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Contenido del comentario */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-xs md:text-sm text-gray-700">
              {displayName}
            </span>
          </div>
          <p className="text-gray-800 text-xs md:text-sm leading-relaxed break-words">
            {comment.contenido}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
