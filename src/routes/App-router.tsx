import { Routes, Route } from "react-router-dom";
import Usuarios from "@/pages/Usuarios";
import Publicaciones from "@/pages/Publicaciones";
import Comentarios from "@/pages/Comentarios";
import Etiquetas from "@/pages/Etiquetas";
import Login from "@/pages/Login";
import Home from "@/pages/Home";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/publicaciones" element={<Publicaciones />} />
      <Route path="/comentarios" element={<Comentarios />} />
      <Route path="/etiquetas" element={<Etiquetas />} />
    </Routes>
  );
};

export default AppRouter;
