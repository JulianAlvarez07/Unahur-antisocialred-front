import { Routes, Route } from "react-router-dom";
import Usuarios from "@/pages/Usuarios";
import Publicaciones from "@/pages/Publicaciones";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Perfil from "@/pages/Perfil";
import Register from "@/pages/Register";
import PostDetail from "@/pages/PostDetail";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/publicaciones" element={<Publicaciones />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/post/:id" element={<PostDetail />} />
    </Routes>
  );
};

export default AppRouter;
