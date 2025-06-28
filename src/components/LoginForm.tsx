import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const LoginForm = () => {
    const { setUsuario } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUsuario(usuario);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="grid grid-cols-6 grid-rows-5 gap-1">
                <div className="col-span-2 row-span-5 col-start-2 w-[500px] h-[700px]">
                    <div className="flex flex-col items-center justify-center h-full">
                        <form className="w-[80%] space-y-6" onSubmit={handleSubmit} onChange={handleChange}>
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
                                    placeholder="Ingresa tu contraseña"
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