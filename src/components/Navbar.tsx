import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";
import { Home, Users, MessageSquare, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const auth = useAuth();
  const usuario = auth?.usuario;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#1a2942] to-[#2c3e50] shadow-lg font-sans">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              to="/home"
              className="flex items-center space-x-2 text-white text-lg md:text-xl font-bold hover:text-[#14b8a6] transition-colors duration-300"
            >
              <MessageSquare className="w-6 h-6" />
              <span>UnaHur Anti-Social</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex items-center space-x-1 lg:space-x-2">
              <li>
                <Link
                  to="/home"
                  className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg text-sm lg:text-base hover:text-[#14b8a6] hover:bg-white/10 transition-all duration-300"
                >
                  <Home className="w-5 h-5" />
                  <span>Inicio</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/usuarios"
                  className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg text-sm lg:text-base hover:text-[#14b8a6] hover:bg-white/10 transition-all duration-300"
                >
                  <Users className="w-5 h-5" />
                  <span>Usuarios</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/publicaciones"
                  className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg text-sm lg:text-base hover:text-[#14b8a6] hover:bg-white/10 transition-all duration-300"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Publicaciones</span>
                </Link>
              </li>
              <li>
                <Link
                  to={usuario ? "/perfil" : "/login"}
                  className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg text-sm lg:text-base hover:text-[#14b8a6] hover:bg-white/10 transition-all duration-300"
                >
                  <User className="w-5 h-5" />
                  <span>{usuario?.nickName || "Login"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 rounded-lg bg-[#1a2942]/95 backdrop-blur-sm border border-white/10">
              <Link
                to="/home"
                className="flex items-center space-x-3 text-white px-4 py-3 rounded-lg text-base hover:text-cyan-400 hover:bg-white/10 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                <span>Inicio</span>
              </Link>
              <Link
                to="/usuarios"
                className="flex items-center space-x-3 text-white px-4 py-3 rounded-lg text-base hover:text-cyan-400 hover:bg-white/10 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="w-5 h-5" />
                <span>Usuarios</span>
              </Link>
              <Link
                to="/publicaciones"
                className="flex items-center space-x-3 text-white px-4 py-3 rounded-lg text-base hover:text-cyan-400 hover:bg-white/10 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageSquare className="w-5 h-5" />
                <span>Publicaciones</span>
              </Link>
              <Link
                to={usuario ? "/perfil" : "/login"}
                className="flex items-center space-x-3 text-white px-4 py-3 rounded-lg text-base hover:text-cyan-400 hover:bg-white/10 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>{usuario?.nickName || "Login"}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
