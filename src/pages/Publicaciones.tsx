import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import { Post } from "@/types/interfaces";
import { motion } from "framer-motion";
import PostForm from "@/components/PostForm";
import { Tag } from "@/types/interfaces";
import { buildApiUrl } from "@/config/api";

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

const Publicaciones = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Obtener posts (ya incluyen comentarios y usuario)
      const postsResponse = await fetch(buildApiUrl("/post"));
      const tagsResponse = await fetch(buildApiUrl("/tags"));
      if (tagsResponse.ok) {
        const tagsData = await tagsResponse.json();
        setTags(tagsData);
      }
      if (!postsResponse.ok) {
        throw new Error(
          `Error ${postsResponse.status}: ${postsResponse.statusText}`
        );
      }
      const postsData = await postsResponse.json();

      // Ordenar posts por fecha descendente (más nuevos primero)
      const sortedPosts = postsData.sort(
        (a: Post, b: Post) =>
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );

      setPosts(sortedPosts);
    } catch (error) {
      setError(
        `Error al cargar las publicaciones: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="font-titulo text-center text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8">
          Publicaciones
        </h1>
        <div className="text-center">
          <p className="text-sm md:text-base">Cargando publicaciones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div {...fadeInUp} className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8 font-mono">
          Publicaciones
        </h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm md:text-base">
          {error}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div {...fadeInUp} className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mb-6 md:mb-8 font-mono">
        Publicaciones
      </h1>
      <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
        <PostForm tags={tags} posts={posts} setPosts={setPosts} />
        {posts.map((post) => {
          // Convertir comentarios al formato esperado por PostCard
          const adaptedComments = (post.comment || []).map((comment) => ({
            userId: comment.userIdComment,
            contenido: comment.comentario,
            nickName: comment.nickName,
            user: comment.user,
          }));

          return (
            <PostCard
              key={post.id}
              user={post.user || { nickName: `Usuario ${post.userId}` }}
              content={post.contenido}
              comments={adaptedComments}
              postId={post.id}
              setPosts={setPosts}
              postImages={post.post_images || []}
              tags={post.tags || []}
            />
          );
        })}

        {posts.length === 0 && (
          <div className="text-center py-6 md:py-8">
            <p className="text-gray-500 text-sm md:text-base">
              No hay publicaciones disponibles.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Publicaciones;
