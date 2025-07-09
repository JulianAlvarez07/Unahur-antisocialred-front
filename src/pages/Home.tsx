import { useAuth } from "@/context/AuthProvider";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { Post, User, Tag } from "@/types/interfaces";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Tendencias } from "@/components/homeComponents/Tendencias";
import { Estadisticas } from "@/components/homeComponents/Estadisticas";
import { DatosCuriosos } from "@/components/homeComponents/DatosCuriosos";
import { CallToActionRegistro } from "@/components/homeComponents/CallToActionRegistro";
import { buildApiUrl } from "@/config/api";

const TypewriterText = ({ text }: { text: string }) => {
  return (
    <motion.span
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{
        duration: 1.5,
        ease: "easeOut",
      }}
      className="inline-block whitespace-nowrap overflow-hidden"
    >
      {text}
    </motion.span>
  );
};

const Home = () => {
  const auth = useAuth();
  const usuario = auth?.usuario;

  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Obtener posts (ya incluyen comentarios y usuario)
      const postsResponse = await fetch(buildApiUrl("/post"));
      if (postsResponse.ok) {
        const postsData = await postsResponse.json();

        // Pone las ultimas publicaciones al principio
        const sortedPosts = postsData
          .sort(
            (a: Post, b: Post) =>
              new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
          )
          .slice(0, 10);

        setPosts(sortedPosts);
      }

      // Obtener usuarios
      const usersResponse = await fetch(buildApiUrl("/users"));
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData);
      }

      // Obtener tags
      const tagsResponse = await fetch(buildApiUrl("/tags"));
      if (tagsResponse.ok) {
        const tagsData = await tagsResponse.json();
        setTags(tagsData);
      }
    } catch (error) {
      setError(
        `Error al cargar los datos: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-4 py-6 max-w-[100vw]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sección Principal */}
          <main className="lg:col-span-3 space-y-6">
            {/* Banner de bienvenida */}
            <div className="bg-secondary text-white p-4 md:p-6 rounded-lg border-2 border-dashed border-[#14b8a6] shadow-[0_10px_30px_-10px_rgba(20,184,166,0.3),0_10px_40px_-15px_rgba(26,41,66,0.35)] break-words">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h1 className="text-xl md:text-2xl lg:text-4xl font-bold font-mono break-words">
                  <TypewriterText text="¡Bienvenido a UnaHur Anti-Social Net!" />
                </h1>
                <MessageSquare className="w-6 h-6 text-[#14b8a6]" />
              </div>

              <motion.p
                className="text-sm md:text-base lg:text-lg opacity-90 mt-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.9, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                {usuario
                  ? `Hola ${
                      usuario.nombre.split(" ")[0]
                    }, contá lo que quieras y probá tus habilidades CRUD.`
                  : "La red social donde menos social, más auténtico. Conectate con Los CRUDos."}
              </motion.p>
            </div>

            {/* Crear nueva publicación - Solo si está logueado */}
            {usuario && (
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 md:p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4 gap-2"
                >
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto sm:mx-0">
                    <span className="text-white font-bold text-lg">
                      {usuario.nickName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-lg md:text-xl font-semibold">
                      ¿Qué estás pensando, {usuario.nombre.split(" ")[0]}?
                    </h2>
                    <p className="text-sm text-gray-500">
                      Comparte tus ideas con la comunidad CRUDos
                    </p>
                  </div>
                </motion.div>
                <PostForm tags={tags} setPosts={setPosts} posts={posts} />
              </div>
            )}

            {/* Call to action para usuarios no logueados */}
            {!usuario && <CallToActionRegistro />}

            {/* Feed de publicaciones */}
            <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center font-libertinus-mono">
                Publicaciones recientes
              </h2>

              {loading && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Cargando publicaciones...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm md:text-base text-center">
                  {error}
                </div>
              )}

              {!loading && !error && (
                <>
                  {/* Todas las publicaciones */}
                  <div className="space-y-6">
                    {posts.map((post) => {
                      const adaptedComments = (post.comment || []).map(
                        (comment) => ({
                          userId: comment.userIdComment,
                          contenido: comment.comentario,
                          nickName: comment.nickName,
                          user: comment.user,
                        })
                      );

                      return (
                        <PostCard
                          key={post.id}
                          postId={post.id}
                          user={
                            post.user || { nickName: `Usuario ${post.userId}` }
                          }
                          content={post.contenido}
                          comments={adaptedComments}
                          setPosts={
                            setPosts as React.Dispatch<
                              React.SetStateAction<Post[]>
                            >
                          }
                          postImages={post.post_images || []}
                          tags={post.tags || []}
                        />
                      );
                    })}

                    {posts.length === 0 && !loading && (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">📝</span>
                        </div>
                        <p className="text-gray-500 text-lg">
                          No hay publicaciones disponibles
                        </p>
                        <p className="text-gray-400 text-sm">
                          ¡Sé el primero en publicar algo!
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Tendencias tags={tags} loading={loading} setTags={setTags} />
            <Estadisticas />
            <DatosCuriosos />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;
