import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const authContext = useAuth();
    const [nickname, setNickname] = useState("");
    const [contrasena, setContrasena] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validar contraseña fija
        if (contrasena !== "123456") {
            alert("Contraseña incorrecta. Usa '123456'");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/users");
            const data = await response.json();
            const user = data.find((user: any) => user.nickName === nickname);
            
            if (user) {
                authContext?.setUsuario?.(user);
                navigate("/home");
            } else {
                alert("Usuario no encontrado");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="grid grid-cols-6 grid-rows-5 gap-1">
                <div className="col-span-2 row-span-5 col-start-2 w-[500px] h-[700px]">
                    <div className="flex flex-col items-center justify-center h-full">
                        <form className="w-[80%] space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label htmlFor="nickname" className="block text-sm font-bold">
                                    Nickname
                                </label>
                                <input
                                    type="text"
                                    id="nickname"
                                    name="nickname"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ffff]"
                                    placeholder="Ingresa tu nickname"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-bold">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ffff]"
                                    placeholder="Ingresa tu contraseña (123456)"
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-secondary text-white py-2 px-4 rounded-md cursor-pointer hover:!bg-blue-800 transition-colors"
                            >
                                Iniciar sesión
                            </button>

                            <p className="text-center text-gray-500 text-sm">
                                ¿No tenés una cuenta?{" "}
                                <Link to="/register" className="text-secondary hover:underline">
                                    Registrate acá
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="col-span-2 row-span-5 col-start-4 bg-secondary rounded-lg w-[500px] h-[700px]">
                    <div className="flex flex-col items-center justify-center h-full">
                        <h2 className="text-white text-center text-3xl font-bold mb-4">
                            Bienvenido a nuestra Red Anti-Social Unahur
                        </h2>
                        <h3 className="text-white text-center text-2xl mb-4">Los CRUDos</h3>
                        <p className="text-white text-center text-sm">
                            Inicia sesión para continuar
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

};


export default LoginForm;