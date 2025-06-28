import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";

const Publicaciones = () => {
  const [posts, setPosts] = useState([]);

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
    console.log(data);
    setPosts(data)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-titulo text-center text-4xl mb-8">Publicaciones</h1>

      <div className="space-y-6">
        {posts.map((post, index) => (
          <PostCard
            key={index}
            user={post.user.nickName}
            content={post.contenido}
          />
        ))}
      </div>
    </div>
  );
};

export default Publicaciones;
