import { motion } from "motion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { buildApiUrl } from "@/config/api";
import { User } from "@/types/interfaces";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);

  // Función para verificar si el nickname está disponible
  const checkNicknameAvailability = async (nickname: string) => {
    if (!nickname.trim()) {
      setNicknameError("");
      return;
    }

    setIsCheckingNickname(true);
    setNicknameError("");

    try {
      const response = await fetch(buildApiUrl("/users"));
      const users = await response.json();
      const existingUser = users.find(
        (user: User) => user.nickName === nickname
      );

      if (existingUser) {
        setNicknameError("Este nickname ya está ocupado");
      } else {
        setNicknameError("");
      }
    } catch (error) {
      console.error("Error al verificar nickname:", error);
      setNicknameError("Error al verificar disponibilidad");
    } finally {
      setIsCheckingNickname(false);
    }
  };

  // Función para manejar el cambio del nickname con validación
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickName(value);

    // Validar después de un pequeño delay para evitar muchas peticiones
    const timeoutId = setTimeout(() => {
      checkNicknameAvailability(value);
    }, 1000);

    return () => clearTimeout(timeoutId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar si hay errores antes de enviar
    if (nicknameError) {
      alert("Por favor corrige los errores antes de continuar");
      return;
    }

    const user = {
      nickName,
      nombre,
      email,
      fechaNacimiento: birthday,
    };

    try {
      const response = await fetch(buildApiUrl("/users"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        navigate("/login");
      } else {
        alert("Error al registrar usuario");
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error desconocido");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-5xl w-full space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Formulario de Login */}
          <div className="p-6 md:p-8 lg:p-12">
            <div className="max-w-sm mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Registrate
                </h2>
                <p className="text-gray-600">
                  Ingresa tus datos para continuar
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="Ingresa tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="nickName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nickname
                  </label>
                  <input
                    type="text"
                    id="nickName"
                    name="nickName"
                    required
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent ${
                      nicknameError ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Ingresa tu nickname"
                    value={nickName}
                    onChange={handleNicknameChange}
                  />
                  {isCheckingNickname && (
                    <motion.p
                      className="text-sm text-blue-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Verificando disponibilidad...
                    </motion.p>
                  )}
                  {nicknameError && (
                    <motion.p
                      className="text-sm text-red-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {nicknameError}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="Ingresa tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="birthday"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
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
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-secondary text-white py-2 px-4 rounded-md font-medium transition-colors cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Registrate
                </motion.button>

                <p className="text-center text-gray-500 text-sm">
                  ¿Ya tenés una cuenta?{" "}
                  <Link
                    to="/"
                    className="text-secondary hover:text-blue-700 font-medium hover:underline"
                  >
                    Ingresá acá
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
                ¡Bienvenido!
              </h2>

              <h3 className="text-xl font-semibold mb-4 text-white">
                Red Anti-Social UnaHur
              </h3>

              <p className="text-white mb-6 leading-relaxed">
                Conectate con Los CRUDos y comparte tus ideas en nuestra
                comunidad universitaria exclusiva
              </p>
              <p className="text-white mb-6 leading-relaxed">
                Puedes ingresar a nuestra red sin iniciar sesión, pero para
                acceder a todas las funcionalidades, tenés que registrarte.
              </p>
              <p className="text-white mb-6 leading-relaxed">
                Entra desde aqui:{" "}
                <Link
                  to="/Home"
                  className="text-secondary hover:text-blue-700 font-medium hover:underline"
                >
                  Inicio
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
