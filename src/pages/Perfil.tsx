import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { User, Post } from "@/types/interfaces";
import { motion } from "framer-motion";
import { Pencil, Trash2, AlertCircle } from "lucide-react";

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

const Perfil = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const usuario = auth?.usuario;

  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [tempDescription, setTempDescription] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Redirigir si no está logueado
    if (!usuario) {
      navigate("/");
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
      const userResponse = await fetch(
        `http://localhost:3001/users/${usuario.id}`
      );
      if (userResponse.ok) {
        const userData = await userResponse.json();
        console.log("Datos del usuario:", userData);
        // Cargar la descripción desde localStorage
        const savedDesc = localStorage.getItem(
          `user_description_${usuario.id}`
        );
        setUserProfile({
          ...userData,
          descripcion: savedDesc || "",
        });
        setTempDescription(savedDesc || "");
      }

      // Obtener posts del usuario
      const postsResponse = await fetch("http://localhost:3001/post");
      if (postsResponse.ok) {
        const allPosts = await postsResponse.json();
        // Filtrar solo los posts del usuario actual
        const filteredPosts = allPosts.filter(
          (post: Post) => post.userId === usuario.id
        );
        console.log("Posts del usuario:", filteredPosts);
        setUserPosts(filteredPosts);
      }
    } catch (error) {
      console.error("Error al cargar el perfil:", error);
      setError(
        `Error al cargar el perfil: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      auth?.setUsuario?.(null);
      navigate("/");
    }
  };

  const handleVerMas = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const handleEliminarPost = async (postId: number) => {
    // Confirmación antes de eliminar
    if (
      !window.confirm(
        "¿Estás seguro de que quieres eliminar esta publicación? Esta acción no se puede deshacer."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/post/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Actualizar la lista de posts eliminando el post borrado
        setUserPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== postId)
        );
        alert("Publicación eliminada exitosamente");
      } else {
        alert("Error al eliminar la publicación");
      }
    } catch (error) {
      console.error("Error al eliminar el post:", error);
      alert("Error al conectar con el servidor");
    }
  };

  const handleSaveDescription = () => {
    if (usuario && tempDescription.trim()) {
      localStorage.setItem(
        `user_description_${usuario.id}`,
        tempDescription.trim()
      );
      setUserProfile((prev) =>
        prev ? { ...prev, descripcion: tempDescription.trim() } : null
      );
      setIsEditingDesc(false);
    }
  };

  const handleCancelEdit = () => {
    setTempDescription(userProfile?.descripcion || "");
    setIsEditingDesc(false);
  };

  const handleDeleteAccount = async () => {
    if (!usuario) return;

    try {
      setIsDeleting(true);
      const response = await fetch(
        `http://localhost:3001/users/${usuario.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Limpiar localStorage
        localStorage.removeItem(`user_description_${usuario.id}`);
        // Cerrar sesión
        auth?.setUsuario?.(null);
        navigate("/");
      } else {
        alert("Error al eliminar la cuenta. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar la cuenta. Por favor, intenta de nuevo.");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
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
      <motion.div
        {...fadeInUp}
        className="bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8 mb-6"
      >
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
              {usuario.nombre}
            </h1>
            <h2 className="text-xl md:text-2xl text-secondary font-semibold mb-2">
              {usuario.nickName}
            </h2>
            <div className="mb-6 relative">
              {isEditingDesc ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium text-gray-700"
                    >
                      Tu descripción
                    </label>
                    <span className="text-xs text-gray-500">
                      {tempDescription.length}/500 caracteres
                    </span>
                  </div>
                  <textarea
                    id="description"
                    value={tempDescription}
                    onChange={(e) => setTempDescription(e.target.value)}
                    maxLength={500}
                    rows={4}
                    placeholder="Escribe algo sobre ti..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors resize-none"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-400 hover:text-white rounded-md transition-colors cursor-pointer border border-gray-300"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveDescription}
                      disabled={!tempDescription.trim()}
                      className={`px-3 py-1.5 text-sm text-white rounded-md transition-colors flex items-center gap-2 cursor-pointer
                        ${
                          !tempDescription.trim()
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-secondary cursor-pointer"
                        }`}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="group">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">
                      Descripción
                    </h3>
                    <button
                      onClick={() => {
                        setTempDescription(userProfile?.descripcion || "");
                        setIsEditingDesc(true);
                      }}
                      className="text-sm text-secondary transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                      {userProfile?.descripcion
                        ? "Editar"
                        : "Agregar descripción"}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 min-h-[3rem] bg-gray-50 p-3 rounded-md">
                    {userProfile?.descripcion || "No hay descripción"}
                  </p>
                </div>
              )}
            </div>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              Miembro desde:{" "}
              {userProfile?.createdAt
                ? new Date(userProfile.createdAt).toLocaleDateString()
                : "Fecha no disponible"}
            </p>

            {/* Estadísticas */}
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 text-sm md:text-base">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className="font-semibold text-secondary">
                  {userPosts.length}
                </span>
                <span className="text-gray-600">Publicaciones</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className="font-semibold text-secondary">
                  {userPosts.reduce(
                    (total, post) => total + (post.comment?.length || 0),
                    0
                  )}
                </span>
                <span className="text-gray-600">Comentarios recibidos</span>
              </div>
            </div>
          </div>

          {/* Botones de Cuenta */}
          <div className="mt-4 md:mt-0 flex flex-col space-y-2">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
            >
              Cerrar Sesión
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-black hover:bg-red-700 hover:text-black text-white px-4 py-2 rounded-md font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar Cuenta
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                Eliminar Cuenta
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar tu cuenta? Esta opcion
              borrará todos tus datos y contenidos.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-400 hover:text-white rounded-md transition-colors cursor-pointer border border-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className={`px-4 py-2 text-white rounded-md transition-colors flex items-center gap-2 cursor-pointer
                  ${
                    isDeleting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Eliminando...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Eliminar Cuenta
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Mis Publicaciones */}
      <motion.div
        {...fadeInUp}
        className="bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8 max-w-6xl"
      >
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Mis Publicaciones ({userPosts.length})
        </h3>

        {userPosts.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-sm md:text-base">
              Aún no has creado ninguna publicación
            </p>
            <p className="text-gray-400 text-xs md:text-sm mt-1">
              ¡Comparte tus ideas con la comunidad!
            </p>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {userPosts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow"
              >
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
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.476L3 21l1.476-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
                        />
                      </svg>
                      <span>{post.comment?.length || 0} comentarios</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        {post.fecha
                          ? new Date(post.fecha).toLocaleDateString()
                          : "Fecha no disponible"}
                      </span>
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="flex gap-2">
                    {/* Botón Ver Más */}
                    <button
                      onClick={() => handleVerMas(post.id)}
                      className="bg-secondary hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 cursor-pointer"
                    >
                      Ver más
                    </button>

                    {/* Botón Eliminar */}
                    <button
                      onClick={() => handleEliminarPost(post.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer inline-flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Perfil;
