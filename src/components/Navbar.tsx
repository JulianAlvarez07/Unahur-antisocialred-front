import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";

const Navbar = () => {
  const auth = useAuth();
  const usuario = auth?.usuario;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  console.log(usuario);
  
  return (
    <nav className="bg-[#1a2942] shadow-lg font-navbar">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/home" className="text-white text-lg md:text-xl font-bold hover:text-cyan-400 transition-colors">
              UnaHur Anti-Social
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex space-x-4 lg:space-x-6">
              <li>
                <Link
                  to="/home"
                  className="text-white px-3 py-2 rounded-md text-sm lg:text-base hover:text-cyan-400 hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/usuarios"
                  className="text-white px-3 py-2 rounded-md text-sm lg:text-base hover:text-cyan-400 hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                >
                  Usuarios
                </Link>
              </li>
              <li>
                <Link
                  to="/publicaciones"
                  className="text-white px-3 py-2 rounded-md text-sm lg:text-base hover:text-cyan-400 hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                >
                  Publicaciones
                </Link>
              </li>
              <li>
                <Link
                  to={usuario ? "/perfil" : "/login"}
                  className="text-white px-3 py-2 rounded-md text-sm lg:text-base hover:text-cyan-400 hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                >
                  {usuario?.nickName || "Login"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-cyan-400 focus:outline-none focus:text-cyan-400 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#1a2942] border-t border-gray-600">
              <Link
                to="/home"
                className="text-white block px-3 py-2 rounded-md text-base hover:text-cyan-400 hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/usuarios"
                className="text-white block px-3 py-2 rounded-md text-base hover:text-cyan-400 hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Usuarios
              </Link>
              <Link
                to="/publicaciones"
                className="text-white block px-3 py-2 rounded-md text-base hover:text-cyan-400 hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Publicaciones
              </Link>
              <Link
                to={usuario ? "/perfil" : "/login"}
                className="text-white block px-3 py-2 rounded-md text-base hover:text-cyan-400 hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {usuario?.nickName || "Login"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
