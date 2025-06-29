import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  contenido: string;
  userId: number;
  fecha: string;
}

interface User {
  id: number;
  nickName: string;
}

interface Comment {
  id: number;
  contenido: string;
  userId: number;
  postId: number;
}

const Publicaciones = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<{ [postId: number]: Comment[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("Intentando cargar publicaciones...");
      // Obtener posts
      const postsResponse = await fetch("http://localhost:3001/post");
      console.log("Respuesta de posts:", postsResponse.status, postsResponse.statusText);
      
      if (!postsResponse.ok) {
        throw new Error(`Error ${postsResponse.status}: ${postsResponse.statusText}`);
      }
      const postsData = await postsResponse.json();
      console.log("Posts cargados:", postsData);
      setPosts(postsData);

      // Obtener usuarios
      const usersResponse = await fetch("http://localhost:3001/users");
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        console.log("Usuarios cargados:", usersData);
        setUsers(usersData);
      }

      // Obtener comentarios para cada post
      const commentsData: { [postId: number]: Comment[] } = {};
      for (const post of postsData) {
        try {
          const commentsResponse = await fetch(`http://localhost:3001/post/${post.id}/comments`);
          if (commentsResponse.ok) {
            const postComments = await commentsResponse.json();
            commentsData[post.id] = postComments;
          }
        } catch (error) {
          console.error(`Error al cargar comentarios del post ${post.id}:`, error);
        }
      }
      setComments(commentsData);

    } catch (error) {
      console.error("Error detallado:", error);
      setError(`Error al cargar las publicaciones: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-titulo text-center text-4xl mb-8">Publicaciones</h1>
        <div className="text-center">
          <p>Cargando publicaciones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-titulo text-center text-4xl mb-8">Publicaciones</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-titulo text-center text-4xl mb-8">Publicaciones</h1>

      <div className="space-y-6">
        {posts.map((post) => {
          const user = users.find(u => u.id === post.userId);
          const postComments = comments[post.id] || [];
          
          return (
            <PostCard
              key={post.id}
              user={user || { nickName: `Usuario ${post.userId}` }}
              content={post.contenido}
              comments={postComments}
            />
          );
        })}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay publicaciones disponibles.</p>
        </div>
      )}
    </div>
  );
};

export default Publicaciones;
