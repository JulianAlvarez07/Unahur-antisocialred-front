
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
    const navigate = useNavigate();
    const [nickName, setNickName] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = {
            nickName,
            nombre,
            email,
            fechaNacimiento: birthday
        }

        try {
            const response = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            if (response.ok) {
                navigate("/login");
            } else {
                alert("Error al registrar usuario");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl w-full space-y-8">
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
                                    Registrate
                                </h2>
                                <p className="text-gray-600">
                                    Ingresa tus datos para continuar
                                </p>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
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
                                    <label htmlFor="nickName" className="block text-sm font-medium text-gray-700">
                                        Nickname
                                    </label>
                                    <input
                                        type="text"
                                        id="nickName"
                                        name="nickName"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                                        placeholder="Ingresa tu nickname"
                                        value={nickName}
                                        onChange={(e) => setNickName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                                    <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                                        Fecha de nacimiento
                                    </label>
                                    <input
                                        type="date"
                                        id="birthday"
                                        name="birthday"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                                        placeholder="Ingresa tu nickname"
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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

                                <button
                                    type="submit"
                                    className="w-full bg-secondary text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors"
                                >
                                    Registrate
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sección de Bienvenida */}
                    <div className="bg-secondary p-6 md:p-8 lg:p-12 flex items-center justify-center">
                        <div className="text-center text-white">
                            <div className="mb-8">
                                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                ¡Bienvenido!
                            </h2>

                            <h3 className="text-xl font-semibold mb-4 text-white">
                                Red Anti-Social UnaHur
                            </h3>

                            <p className="text-white mb-6 leading-relaxed">
                                Conectate con Los CRUDos y comparte tus ideas en nuestra comunidad universitaria exclusiva
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default RegisterForm;