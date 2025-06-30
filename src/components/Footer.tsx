import { MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto py-6 bg-gradient-to-r from-[#1a2942] to-[#2c3e50] border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2 text-cyan-400">
            <MessageSquare className="w-5 h-5" />
            <span className="font-semibold">UnaHur Anti-Social Net</span>
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            <a
              href="#"
              className="text-gray-300 hover:text-cyan-400 transition-all duration-300 text-sm"
            >
              Términos
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-cyan-400 transition-all duration-300 text-sm"
            >
              Privacidad
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-cyan-400 transition-all duration-300 text-sm"
            >
              Contacto
            </a>
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>hecho por Los CRUDos &copy; 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
