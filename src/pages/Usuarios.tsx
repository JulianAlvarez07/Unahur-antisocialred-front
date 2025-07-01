import { useState, useEffect } from "react";
import { User } from "@/types/interfaces";
import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        console.log("Intentando cargar usuarios...");
        const response = await fetch("http://localhost:3001/users");
        console.log(
          "Respuesta del servidor:",
          response.status,
          response.statusText
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Usuarios cargados:", data);
        setUsuarios(data);
      } catch (error) {
        console.error("Error detallado:", error);
        setError(
          `Error al cargar la lista de usuarios: ${
            error instanceof Error ? error.message : "Error desconocido"
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  // Filtrar usuarios por nickname en tiempo real (solo si empieza con el texto buscado)
  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nickName.toLowerCase().startsWith(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 mb-6 md:mb-8 font-mono">
          Usuarios
        </h1>
        <div className="text-center">
          <p className="text-sm md:text-base">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="font-titulo text-center text-2xl md:text-3xl lg:text-4xl mt-4 mb-6 md:mb-8">
          Usuarios
        </h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm md:text-base">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 mb-6 md:mb-8 font-mono"
      >
        Usuarios
      </motion.h1>

      {/* Barra de búsqueda */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Buscar por nickname..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        {filteredUsuarios.map((usuario) => (
          <motion.div
            key={usuario.id}
            variants={item}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">
                  {usuario.nickName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-semibold text-base md:text-lg text-gray-900">
                  {usuario.nickName}
                </h3>
                <p className="text-xs md:text-sm text-gray-500">
                  {usuario.createdAt
                    ? `Miembro desde ${new Date(
                        usuario.createdAt
                      ).toLocaleDateString()}`
                    : "Fecha de registro no disponible"}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredUsuarios.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-6 md:py-8"
        >
          <p className="text-gray-500 text-sm md:text-base">
            No hay usuarios disponibles.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Usuarios;
