import { Routes, Route } from "react-router-dom";
import Inicio from "@/pages/Inicio";
import Usuarios from "@/pages/Usuarios";
import Publicaciones from "@/pages/Publicaciones";
import Comentarios from "@/pages/Comentarios";
import Etiquetas from "@/pages/Etiquetas";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/publicaciones" element={<Publicaciones />} />
      <Route path="/comentarios" element={<Comentarios />} />
      <Route path="/etiquetas" element={<Etiquetas />} />
    </Routes>
  );
};

export default AppRouter;
