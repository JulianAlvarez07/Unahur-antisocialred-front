import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { Post } from "@/types/interfaces";

interface CommentDetailsFormProps {
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post | null>>;
}

const CommentDetailsForm = ({ post, setPost }: CommentDetailsFormProps) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [comment, setComment] = useState("");
  const auth = useAuth();
  const userId = auth?.usuario?.id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) {
      return;
    }

    try {
      const comentario = {
        comentario: comment,
        userIdComment: userId,
      };
      const response = await fetch(
        `http://localhost:3001/post/${post.id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comentario),
        }
      );
      if (response.ok) {
        const savedComment = await response.json();

        // Agregar la información del usuario al comentario
        const commentWithUser = {
          ...savedComment,
          user: {
            nickname: auth?.usuario?.nickName,
            nombre: auth?.usuario?.nombre,
          },
        };

        setComment("");
        setIsFormVisible(false);
        setPost((prevPost) => {
          if (!prevPost) return null;
          return {
            ...prevPost,
            comment: [...(prevPost.comment || []), commentWithUser],
          };
        });
      } else {
        console.error("Error al enviar el comentario:", response.status);
      }
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

  return (
    <div className="w-full">
      {/* Encabezado clickeable */}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="w-full text-left font-semibold text-gray-700 mb-2 md:mb-3 text-sm md:text-base hover:text-blue-600 transition-colors duration-200 flex items-center justify-between"
      >
        <span>Comentar</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isFormVisible ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Formulario */}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              maxLength={500}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 transition-colors text-sm md:text-base resize-none"
              placeholder="Escribe tu comentario aquí..."
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs md:text-sm text-gray-500">
                {comment.length}/500 caracteres
              </span>
              {comment.length > 450 && (
                <span className="text-xs md:text-sm text-orange-500">
                  Casi al límite
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsFormVisible(false);
                setComment("");
              }}
              className="px-3 md:px-4 py-2 rounded-md font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 text-sm md:text-base"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!comment.trim()}
              className={`
                                px-3 md:px-4 py-2 rounded-md font-medium text-white transition-colors duration-200 text-sm md:text-base
                                ${
                                  !comment.trim()
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                }
                            `}
            >
              Comentar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentDetailsForm;
