import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { buildApiUrl } from "@/config/api";
import { User } from "@/types/interfaces";

const LoginForm = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const [nickname, setNickname] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar contraseña fija
    if (contrasena !== "123456") {
      alert("Contraseña incorrecta. Usa '123456'");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(buildApiUrl("/users"));
      const data = await response.json();
      const user = data.find((user: User) => user.nickName === nickname);

      if (user) {
        authContext?.setUsuario?.(user);
        navigate("/home");
      } else {
        alert("Usuario no encontrado");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl w-full space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            UnaHur Anti-Social Red
          </h1>
          <p className="text-lg text-gray-600">Los CRUDos</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Formulario de Login */}
          <div className="p-6 md:p-8 lg:p-12">
            <div className="max-w-sm mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Iniciar Sesión
                </h2>
                <p className="text-gray-600">
                  Ingresa tus credenciales para continuar
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="nickname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nickname
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="Ingresa tu nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="Ingresa tu contraseña (123456)"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-secondary text-white py-2 px-4 rounded-md font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isLoading ? 1 : 1.03 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      <span>Cargando...</span>
                    </div>
                  ) : (
                    "Iniciar sesión"
                  )}
                </motion.button>

                <p className="text-center text-gray-500 text-sm">
                  ¿No tenés una cuenta?{" "}
                  <Link
                    to="/register"
                    className="text-secondary hover:text-blue-700 font-medium hover:underline"
                  >
                    Registrate acá
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Sección de Bienvenida */}
          <motion.div
            className="bg-secondary p-6 md:p-8 lg:p-12 flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="text-center text-white">
              <div className="mb-8">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <motion.img
                    src="/crudos-icon.png"
                    alt="logo"
                    className="w-12 h-12"
                    whileHover={{ rotate: 360 }}
                  />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                ¡Bienvenido de vuelta!
              </h2>

              <h3 className="text-xl font-semibold mb-4 text-white">
                Red Anti-Social UnaHur
              </h3>

              <p className="text-white mb-6 leading-relaxed">
                Conectate con Los CRUDos y comparte tus ideas en nuestra
                comunidad universitaria exclusiva
              </p>

              {/* Example User Credentials Box */}
              <div className="mt-4 p-4 bg-opacity-10 backdrop-blur-sm rounded-lg border border-white border-opacity-20">
                <p className="font-medium mb-2">Usuario de ejemplo:</p>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Nickname:</span> Pedrito23
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Contraseña:</span> 123456
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
