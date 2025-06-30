import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export const CallToActionRegistro = () => {
  return (
    <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-md p-6 md:p-8 text-white">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="bg-white/20 p-3 rounded-full">
          <UserPlus className="w-8 h-8" />
        </div>

        <h2 className="text-xl md:text-2xl font-bold font-mono">
          ¡Únete a nuestra comunidad!
        </h2>

        <p className="text-white/90 text-sm md:text-base max-w-md">
          Comparte tus pensamientos, conecta con otros desarrolladores y sé
          parte de la conversación.
        </p>

        <Link
          to="/register"
          className="mt-2 inline-flex items-center gap-2 bg-white text-teal-600 px-6 py-2 rounded-full font-semibold 
            hover:bg-teal-50 transition-colors duration-200 text-sm md:text-base"
        >
          Registrarse
          <UserPlus className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
