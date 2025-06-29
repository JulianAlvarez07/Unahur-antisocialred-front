import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { User, Post } from "@/types/interfaces";

const Perfil = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const usuario = auth?.usuario;
    
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Redirigir si no está logueado
        if (!usuario) {
            navigate("/login");
            return;
        }
        
        fetchUserProfile();
    }, [usuario, navigate]);

    const fetchUserProfile = async () => {
        if (!usuario) return;
        
        try {
            setLoading(true);
            console.log(`Cargando perfil del usuario ID: ${usuario.id}`);
            
            // Obtener datos del usuario específico
            const userResponse = await fetch(`http://localhost:3001/users/${usuario.id}`);
            if (userResponse.ok) {
                const userData = await userResponse.json();
                console.log("Datos del usuario:", userData);
                setUserProfile(userData);
            }

            // Obtener posts del usuario
            const postsResponse = await fetch("http://localhost:3001/post");
            if (postsResponse.ok) {
                const allPosts = await postsResponse.json();
                // Filtrar solo los posts del usuario actual
                const filteredPosts = allPosts.filter((post: Post) => post.userId === usuario.id);
                console.log("Posts del usuario:", filteredPosts);
                setUserPosts(filteredPosts);
            }

        } catch (error) {
            console.error("Error al cargar el perfil:", error);
            setError(`Error al cargar el perfil: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            auth?.setUsuario?.(null);
            navigate("/login");
        }
    };

    const handleVerMas = (postId: number) => {
        // Por ahora navegar a publicaciones, se puede crear una vista de detalle específica después
        navigate(`/publicaciones#post-${postId}`);
    };

    if (!usuario) {
        return null; // O un spinner mientras redirige
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-6 md:py-8">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
                    <p className="mt-2 text-gray-600">Cargando perfil...</p>
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

    return (
        <div className="container mx-auto px-4 py-6 md:py-8">
            {/* Header del Perfil */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8 mb-6">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                    {/* Avatar */}
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl md:text-3xl">
                            {usuario.nickName.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    
                    {/* Info del Usuario */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Perfil de Usuario
                        </h1>
                        <h2 className="text-xl md:text-2xl text-secondary font-semibold mb-2">
                            {usuario.nickName}
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 mb-4">
                            Miembro desde: {userProfile?.createdAt 
                                ? new Date(userProfile.createdAt).toLocaleDateString() 
                                : "Fecha no disponible"}
                        </p>
                        
                        {/* Estadísticas */}
                        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-sm md:text-base">
                            <div className="flex items-center justify-center md:justify-start space-x-2">
                                <span className="font-semibold text-secondary">{userPosts.length}</span>
                                <span className="text-gray-600">Publicaciones</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start space-x-2">
                                <span className="font-semibold text-secondary">
                                    {userPosts.reduce((total, post) => total + (post.comment?.length || 0), 0)}
                                </span>
                                <span className="text-gray-600">Comentarios recibidos</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Botón de Logout */}
                    <div className="mt-4 md:mt-0">
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>

            {/* Mis Publicaciones */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                    Mis Publicaciones ({userPosts.length})
                </h3>

                {userPosts.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-sm md:text-base">Aún no has creado ninguna publicación</p>
                        <p className="text-gray-400 text-xs md:text-sm mt-1">¡Comparte tus ideas con la comunidad!</p>
                    </div>
                ) : (
                    <div className="space-y-4 md:space-y-6">
                        {userPosts.map((post) => (
                            <div key={post.id} className="border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow">
                                {/* Contenido del Post */}
                                <div className="mb-4">
                                    <p className="text-gray-800 leading-relaxed text-sm md:text-base break-words">
                                        {post.contenido}
                                    </p>
                                </div>

                                {/* Información del Post */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pt-3 border-t border-gray-100">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.476L3 21l1.476-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                                            </svg>
                                            <span>{post.comment?.length || 0} comentarios</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>
                                                {post.fecha 
                                                    ? new Date(post.fecha).toLocaleDateString()
                                                    : "Fecha no disponible"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Botón Ver Más */}
                                    <button
                                        onClick={() => handleVerMas(post.id)}
                                        className="bg-secondary hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                                    >
                                        Ver más
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Perfil;
