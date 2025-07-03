import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Post, Comment } from "@/types/interfaces";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  MessageCircle,
  User,
  Tag as TagIcon,
} from "lucide-react";
import CommentCard from "@/components/CommentCard";

const fadeInUp = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("ID de post no proporcionado");
      setLoading(false);
      return;
    }
    fetchPostDetail();
  }, [id]);

  const fetchPostDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/post/${id}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: Post no encontrado`);
      }
      const data = await response.json();

      // Obtener datos del usuario
      const userResponse = await fetch(
        `http://localhost:3001/users/${data.userId}`
      );
      if (userResponse.ok) {
        const userData = await userResponse.json();
        data.user = userData;
      }

      setPost(data);
    } catch (err) {
      setError(
        `Error al cargar el post: ${
          err instanceof Error ? err.message : "Error desconocido"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
          <p className="mt-2 text-gray-600">Cargando post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div {...fadeInUp} className="container mx-auto px-4 py-6 md:py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </button>
      </motion.div>
    );
  }

  if (!post) {
    return null;
  }

  // Filtrar comentarios visibles (usar el array comment directamente)
  const visibleComments =
    post.comment?.filter((comment: Comment) => comment.visible) || [];

  // Adaptar comentarios para CommentCard
  const adaptedComments = visibleComments.map((comment) => ({
    userId: comment.userIdComment,
    contenido: comment.comentario,
  }));

  return (
    <motion.div {...fadeInUp} className="container mx-auto px-4 py-6 md:py-8">
      {/* Botón Volver */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center px-4 py-2 mb-6 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </button>

      {/* Contenido Principal */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8 max-w-4xl mx-auto">
        {/* Header del Post */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {post.user?.nickName || `Usuario ${post.userId}`}
              </h3>
              <p className="text-gray-500 text-sm">
                {post.user?.nombre || "Sin nombre"}
              </p>
            </div>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {post.fecha
              ? new Date(post.fecha).toLocaleDateString()
              : "Fecha no disponible"}
          </div>
        </div>

        {/* Descripción Completa */}
        <div className="mb-6">
          <div className="prose max-w-none">
            <p className="text-gray-800 leading-relaxed text-base break-words whitespace-pre-wrap">
              {post.contenido}
            </p>
          </div>
        </div>

        {/* Etiquetas */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <TagIcon className="w-5 h-5 mr-2" />
              Etiquetas
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#14b8a6] text-white"
                >
                  <TagIcon className="w-3 h-3 mr-1" />
                  {tag.nombreEtiqueta}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Imágenes */}
        {post.post_images && post.post_images.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Imágenes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {post.post_images.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg border border-gray-200"
                >
                  <img
                    src={image.url}
                    alt={`Imagen ${index + 1} del post`}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estadísticas */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              <span>{visibleComments.length} comentarios visibles</span>
            </div>
            <div className="flex items-center space-x-4">
              {post.tags && <span>{post.tags.length} etiquetas</span>}
              {post.post_images && (
                <span>{post.post_images.length} imágenes</span>
              )}
            </div>
          </div>
        </div>

        {/* Lista de Comentarios Visibles */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Comentarios ({visibleComments.length})
          </h3>

          {visibleComments.length > 0 ? (
            <div className="space-y-4">
              {adaptedComments.map((comment, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <CommentCard comment={comment} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                No hay comentarios visibles para esta publicación.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PostDetail;
