import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";

interface Post {
  user: {
    nickName: string;
  };
  contenido: string;
  comments: {
    userId: number;
    contenido: string;
  }[];
}

const Publicaciones = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    dataPost();
  }, []);
  const dataPost = async () => {
    const response = await fetch("http://localhost:3001/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    console.log("Datos completos:", data);

    setPosts(data)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-titulo text-center text-4xl mb-8">Publicaciones</h1>

      <div className="space-y-6">
        {posts.map((post, index) => {

          // Buscar comentarios con diferentes nombres posibles
          const comments = (post as any).comment;

          return (


            <PostCard
              user={post.user}
              content={post.contenido}
              comments={comments}
            />

          );
        })}
      </div>
    </div>
  );
};

export default Publicaciones;
