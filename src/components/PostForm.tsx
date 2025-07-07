import { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { motion, Variants } from "framer-motion";
import { Tag, Post } from "@/types/interfaces";
import { buildApiUrl } from "@/config/api";

const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

interface PostFormProps {
  tags: Tag[];
  posts?: Post[];
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostForm = ({ tags, posts, setPosts }: PostFormProps) => {
  const [contenido, setContenido] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imagesUrls, setImagesUrls] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [showTagSelector, setShowTagSelector] = useState(false);
  const auth = useAuth();
  const usuario = auth?.usuario;

  const handleTagToggle = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };
  //borra imagen de la lista de imagenes previas
  const handleRemoveImage = (indexToRemove: number) => {
    setImagesUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usuario) {
      alert("Debes iniciar sesión para crear una publicación");
      return;
    }

    const post = {
      contenido: contenido,
      userId: usuario.id,
    };

    try {
      const response = await fetch(buildApiUrl("/post"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        const data = await response.json();
        const postId = data.id;

        // Agregar tags al post
        for (const tagId of selectedTags) {
          try {
            await fetch(buildApiUrl("/comment-tags"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                postId: postId,
                tagId: tagId,
              }),
            });
          } catch (error) {
            console.error("Error al agregar tag:", error);
          }
        }

        // Subir todas las imágenes
        for (const url of imagesUrls) {
          if (url.trim()) {
            const imageBody = JSON.stringify({
              url,
              userId: usuario.id,
            });
            const imageResponse = await fetch(
              buildApiUrl(`/post/${data.id}/addImage`),
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: imageBody,
              }
            );
            if (!imageResponse.ok) {
              console.error("Error al agregar la imagen:", url);
            }
          }
        }
        // Obtener el post completo con imágenes y tags después de agregarlos
        try {
          const completePostResponse = await fetch(
            buildApiUrl(`/post/${postId}?includeUser=true`)
          );
          if (completePostResponse.ok) {
            const completePost = await completePostResponse.json();

            // Asegurarnos de que el post tenga la información del usuario
            const postWithUser = {
              ...completePost,
              user: {
                id: usuario.id,
                nombre: usuario.nombre,
                nickName: usuario.nickName,
                email: usuario.email,
              },
            };

            // Limpiar el formulario
            setContenido("");
            setImagesUrls([]);
            setSelectedTags([]);

            // Agregar el post completo al array y ordenar por fecha
            if (setPosts && posts) {
              const updatedPosts = [postWithUser, ...posts].sort(
                (a: Post, b: Post) =>
                  new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
              );
              setPosts(updatedPosts);
            }
          } else {
            console.error("Error al obtener el post completo");
            // Si no se puede obtener el post completo, usamos el basivo
            if (setPosts && posts) {
              const basicPost = {
                ...data,
                user: {
                  id: usuario.id,
                  nombre: usuario.nombre,
                  nickName: usuario.nickName,
                  email: usuario.email,
                },
              };
              setPosts([basicPost, ...posts]);
            }
          }
        } catch (error) {
          console.error("Error al obtener el post completo:", error);
          // Si hay error, usamos el post básico
          if (setPosts && posts) {
            const basicPost = {
              ...data,
              user: {
                id: usuario.id,
                nombre: usuario.nombre,
                nickName: usuario.nickName,
                email: usuario.email,
              },
            };
            setPosts([basicPost, ...posts]);
          }
        }
      } else {
        console.error("Error al crear el post");
        alert("Error al crear la publicación");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };
  return (
    <motion.div {...scaleIn} className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <label
            htmlFor="contenido"
            className="block text-sm md:text-base font-medium mb-2"
          >
            ¿Qué estás pensando?
          </label>
          <textarea
            id="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            rows={4}
            maxLength={2000}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] resize-none text-sm md:text-base hover:border-blue-500 transition-colors"
            placeholder="Escribe tu publicación aquí..."
          />
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1 space-y-1 sm:space-y-0">
            <span className="text-xs md:text-sm text-gray-500">
              {contenido.length}/2000 caracteres
            </span>
            {contenido.length > 1800 && (
              <span className="text-xs md:text-sm text-orange-500">
                Casi al límite
              </span>
            )}
          </div>
        </motion.div>
        {/*apartado con iconos para agregar imagenes y tags, ubicado en el borde derecho */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="flex items-center justify-between pt-4 border-t border-gray-200"
          id="add-images-tags"
        >
          {/* Icono para agregar imagen, alineado a la izquierda */}
          <div className="flex items-center">
            <button
              type="button"
              className="mr-2 p-2 rounded hover:bg-gray-100 focus:outline-none"
              title="Agregar imagen por URL"
              onClick={() => setShowImageInput((prev) => !prev)}
            >
              {/* SVG de imagen */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-600 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3.75A2.25 2.25 0 004.5 6v12a2.25 2.25 0 002.25 2.25h12A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H6.75zM4.5 16.5l4.72-4.72a2.25 2.25 0 013.18 0l6.1 6.1M15.75 9.75h.008v.008H15.75V9.75z"
                />
              </svg>
            </button>
            {/* Input para la URL de la imagen */}
            {showImageInput && (
              <div className="flex flex-col items-end space-y-2">
                <input
                  id="imageUrl"
                  type="url"
                  placeholder="Pega la URL y presiona Enter"
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  style={{ minWidth: "220px" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && imageUrl.trim()) {
                      e.preventDefault();
                      setImagesUrls([...imagesUrls, imageUrl.trim()]);
                      setImageUrl("");
                    }
                  }}
                />
                {/* Previsualización opcional */}
                {imagesUrls.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {imagesUrls.map((url, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={url}
                          alt={`Previsualización ${idx + 1}`}
                          className="mt-1 max-h-24 rounded border border-gray-200"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                        {/* Botón de eliminar */}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                          title="Eliminar imagen"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Aca va apartado para tags */}
          <div className="flex items-center">
            <button
              type="button"
              className="p-2 rounded hover:bg-gray-100 focus:outline-none"
              title="Agregar tags"
              onClick={() => setShowTagSelector((prev) => !prev)}
            >
              {/* SVG de tag */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-600 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Selector de tags */}
        {showTagSelector && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 rounded-md p-4 bg-gray-50"
          >
            <h4 className="text-sm font-medium mb-2">Seleccionar tags:</h4>
            {!tags || tags.length === 0 ? (
              <div className="text-sm text-gray-500">
                No hay tags disponibles. Puedes crear nuevos tags desde las
                "Tendencias" en la barra lateral.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleTagToggle(tag.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag.id)
                        ? "bg-[#14b8a6] text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {tag.nombreEtiqueta}
                  </button>
                ))}
              </div>
            )}
            {selectedTags.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                Tags seleccionados: {selectedTags.length}
              </div>
            )}
          </motion.div>
        )}
        {/* Action buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="flex items-center justify-end pt-4 border-t border-gray-200"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!contenido.trim()}
            className={`
              px-4 md:px-6 py-2 md:py-3 rounded-md font-medium text-white
              transition-all duration-300 ease-in-out
              ${
                !contenido.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-secondary hover:bg-[#14b8a6] hover:ring-2 hover:ring-[#14b8a6]/50 cursor-pointer"
              }
            `}
          >
            Publicar
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default PostForm;
