import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const Navbar = () => {
  const { usuario } = useAuth()
  console.log(usuario)
  return (
    <div className="flex items-center justify-center h-20 text-white bg-[#1a2942] shadow-lg font-navbar">
      <ul className="flex space-x-6">
        <li className="relative group">
          <Link
            to="/home"
            className="px-4 py-2 inline-block transition-all duration-300 hover:text-cyan-400"
          >
            <span className="relative z-10">Inicio</span>
          </Link>
        </li>
        <li className="relative group">
          <Link
            to="/usuarios"
            className="px-4 py-2 inline-block transition-all duration-300 hover:text-cyan-400"
          >
            <span className="relative z-10">Usuarios</span>
          </Link>
        </li>
        <li className="relative group">
          <Link
            to="/publicaciones"
            className="px-4 py-2 inline-block transition-all duration-300 hover:text-cyan-400"
          >
            <span className="relative z-10">Publicaciones</span>
          </Link>
        </li>
        <li className="relative group">
          <Link
            to="/login"
            className="px-4 py-2 inline-block transition-all duration-300 hover:text-cyan-400"
          >
            <span className="relative z-10">{usuario?.nickName}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
