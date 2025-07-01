import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Post } from "@/types/interfaces";

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
        // eslint-disable-next-line
    }, [id]);

    const fetchPostDetail = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3001/post/${id}`);
            if (!response.ok) throw new Error("No se pudo cargar el post");
            const data = await response.json();
            setPost(data);
        } catch (err) {
            setError(
                `Error al cargar el post: ${err instanceof Error ? err.message : "Error desconocido"}`
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
            <div className="container mx-auto px-4 py-6 md:py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    if (!post) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-6 md:py-8">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Detalle del Post</h2>
                <div className="mb-4">
                    <p className="text-gray-800 leading-relaxed text-base break-words">{post.contenido}</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span>
                        <b>Fecha:</b> {post.fecha ? new Date(post.fecha).toLocaleDateString() : "Fecha no disponible"}
                    </span>
                    <span>
                        <b>Comentarios:</b> {post.comment?.length || 0}
                    </span>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-secondary hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 cursor-pointer"
                >
                    Volver
                </button>
            </div>
        </div>
    );
};

export default PostDetail;
