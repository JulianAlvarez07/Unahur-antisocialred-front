import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { Post, User, Tag } from "@/types/interfaces";

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
      console.log("Cargando datos del Home...");
      
      // Obtener posts (ya incluyen comentarios y usuario)
      const postsResponse = await fetch("http://localhost:3001/post");
      if (postsResponse.ok) {
        const postsData = await postsResponse.json();
        console.log("Posts cargados:", postsData);
        setPosts(postsData);
      }

      // Obtener usuarios
      const usersResponse = await fetch("http://localhost:3001/users");
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        console.log("Usuarios cargados:", usersData);
        setUsers(usersData);
      }

      // Obtener tags
      const tagsResponse = await fetch("http://localhost:3001/tags");
      if (tagsResponse.ok) {
        const tagsData = await tagsResponse.json();
        console.log("Tags cargados:", tagsData);
        setTags(tagsData);
      }

    } catch (error) {
      console.error("Error detallado:", error);
      setError(`Error al cargar los datos: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-4 gap-6">
        {/* Sección Principal */}
        <main className="col-span-3 space-y-6">
          {/* Banner de bienvenida */}
          <div className="bg-secondary text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-2">
              ¡Bienvenido a UnaHur Anti-Social Net!
            </h1>
            <p className="text-lg opacity-90">
              {usuario 
                ? `Hola ${usuario.nickName}, ¿qué estás pensando hoy?` 
                : "La red social donde menos social, más auténtico. Conectate con Los CRUDos."
              }
            </p>
          </div>

          {/* Crear nueva publicación - Solo si está logueado */}
          {usuario && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {usuario.nickName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    ¿Qué estás pensando, {usuario.nickName}?
                  </h2>
                  <p className="text-sm text-gray-500">
                    Comparte tus ideas con la comunidad CRUDos
                  </p>
                </div>
              </div>
              <PostForm />
            </div>
          )}

          {/* Call to action para usuarios no logueados */}
          {!usuario && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  ¡Únete a la conversación!
                </h3>
                <p className="text-gray-600 mb-4">
                  Inicia sesión para crear publicaciones y conectar con otros CRUDos
                </p>
                <Link
                  to="/"
                  className="inline-block bg-secondary text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          )}

          {/* Feed de publicaciones */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Publicaciones recientes</h2>
            
            {loading && (
              <div className="text-center py-8">
                <p className="text-gray-500">Cargando publicaciones...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {!loading && !error && (
              <>
                {/* Todas las publicaciones */}
                {posts.map((post) => {
                  // Convertir comentarios al formato esperado por PostCard
                  const adaptedComments = post.comment.map(comment => ({
                    userId: comment.userIdComment,
                    contenido: comment.comentario
                  }));
                  
                  return (
                    <PostCard
                      key={post.id}
                      user={post.user || { nickName: `Usuario ${post.userId}` }}
                      content={post.contenido}
                      comments={adaptedComments}
                    />
                  );
                })}

                {posts.length === 0 && !loading && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📝</span>
                    </div>
                    <p className="text-gray-500 text-lg">No hay publicaciones disponibles</p>
                    <p className="text-gray-400 text-sm">¡Sé el primero en publicar algo!</p>
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        {/* Sidebar derecho */}
        <aside className="col-span-1 space-y-6">
          {/* Tendencias */}
          <div className="bg-secondary rounded-lg shadow-md">
            <div className="p-4 border-b border-blue-600">
              <h2 className="text-xl font-bold text-white">🔥 Tendencias</h2>
            </div>
            <div className="p-4 space-y-3">
              {loading ? (
                <div className="text-center py-4">
                  <p className="text-white text-sm">Cargando tendencias...</p>
                </div>
              ) : tags.length > 0 ? (
                tags.map((tag) => (
                  <div key={tag.id} className="flex justify-between items-center py-2 hover:bg-blue-600 hover:bg-opacity-20 rounded px-2 transition-colors">
                    <span className="text-white font-medium">#{tag.nombreEtiqueta}</span>
                    <span className="text-xs text-gray-200 bg-white bg-opacity-20 px-2 py-1 rounded-full">
                      Tag
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-white text-sm">No hay tags disponibles</p>
                </div>
              )}
            </div>
          </div>

          {/* Estadísticas */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">📊 CRUDos Stats</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">👥 Miembros registrados</span>
                <span className="font-bold text-secondary">{loading ? "..." : users.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">📝 Publicaciones</span>
                <span className="font-bold text-secondary">{loading ? "..." : posts.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">💬 Comentarios</span>
                <span className="font-bold text-secondary">
                  {loading ? "..." : posts.reduce((total, post) => total + (post.comment?.length || 0), 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">🏷️ Tags disponibles</span>
                <span className="font-bold text-secondary">{loading ? "..." : tags.length}</span>
              </div>
            </div>
          </div>

          {/* Datos curiosos */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-md border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">💡 ¿Sabías que...?</h2>
            </div>
            <div className="p-4 space-y-4 text-sm">
              <div className="bg-white p-3 rounded-lg border-l-4 border-secondary">
                <p className="font-medium text-gray-800">CRUD significa:</p>
                <p className="text-gray-600">Create, Read, Update, Delete</p>
              </div>
              <div className="bg-white p-3 rounded-lg border-l-4 border-green-500">
                <p className="font-medium text-gray-800">React fue creado por:</p>
                <p className="text-gray-600">Facebook (Meta) en 2013</p>
              </div>
              <div className="bg-white p-3 rounded-lg border-l-4 border-purple-500">
                <p className="font-medium text-gray-800">Somos "Anti-Social" porque:</p>
                <p className="text-gray-600">Valoramos calidad sobre cantidad</p>
              </div>
            </div>
          </div>

          {/* Call to action para no autenticados */}
          {!usuario && (
            <div className="bg-gradient-to-br from-secondary to-blue-600 rounded-lg shadow-md text-white">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-bold mb-2">¿Listo para unirte?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Regístrate y forma parte de Los CRUDos
                </p>
                <Link
                  to="/register"
                  className="inline-block bg-white text-secondary px-4 py-2 rounded-md hover:bg-gray-100 transition-colors font-medium text-sm"
                >
                  Registrarse
                </Link>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Home;
