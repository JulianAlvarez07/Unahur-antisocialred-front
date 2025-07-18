import CommentCard from "./CommentCard";
import {
  UserForComponent,
  CommentForComponent,
  Post,
  PostImage,
  Tag,
} from "@/types/interfaces";
import CommentForm from "./CommentForm";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

interface PostCardProps {
  content: string;
  user: UserForComponent;
  comments: CommentForComponent[];
  postId: number;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  postImages: PostImage[];
  tags?: Tag[];
}

const PostCard = ({
  user,
  content,
  comments,
  postId,
  postImages,
  setPosts,
  tags,
}: PostCardProps) => {
  const navigate = useNavigate();

  const handleVerMas = (postId: number) => {
    navigate(`/post/${postId}`);
  };

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
          <div className="flex items-center">
            <p className="font-semibold text-sm md:text-base">{user.nombre}</p>
            <p className="text-gray-500 text-xs md:text-sm ml-2">
              @{user.nickName}
            </p>
          </div>
        </div>
      </div>

      {/* Cuerpo con texto */}
      <div className="mb-3 md:mb-4">
        <p className="leading-relaxed text-sm md:text-base break-words">
          {content}
        </p>
      </div>

      {/* Tags del post */}
      {tags && tags.length > 0 && (
        <div className="mb-3 md:mb-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#14b8a6] text-white"
              >
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                {tag.nombreEtiqueta}
              </span>
            ))}
          </div>
        </div>
      )}

      {postImages && postImages.length > 0 && (
        <div className="mb-3 md:mb-4">
          <div className="flex flex-wrap gap-2">
            {postImages.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Post ${index + 1}`}
                className="w-1/4 h-auto rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
      )}

      {/* Botón Ver Más */}
      <div className="mb-3 md:mb-4 flex justify-end">
        <button
          onClick={() => handleVerMas(postId)}
          className="bg-secondary hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 cursor-pointer inline-flex items-center"
        >
          <Eye className="w-4 h-4 mr-2" />
          Ver más
        </button>
      </div>

      {/* Sección de comentarios */}
      <div className="pt-2 md:pt-3 border-t border-gray-100">
        <CommentForm postId={postId} setPosts={setPosts} />
        <h4 className="font-semibold text-gray-700 mb-2 md:mb-3 text-sm md:text-base">
          Comentarios{" "}
          {comments && comments.length > 0 && `(${comments.length})`}
        </h4>
        {comments && comments.length > 0 ? (
          <div className="space-y-2 md:space-y-3">
            {comments.map((comment, index) => (
              <CommentCard key={index} comment={comment} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-xs md:text-sm italic">
            No hay comentarios aún
          </p>
        )}
      </div>
    </div>
  );
};

export default PostCard;
