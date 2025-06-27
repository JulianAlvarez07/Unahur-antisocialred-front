import { Link } from "react-router-dom";
import PostForm from "../components/PostForm";
const Home = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-4 grid-rows-5 gap-4">
        {/* Sección Principal */}
        <main className="col-span-3 row-span-5">
          {/* Crear nueva publicación */}
          <div className="bg-blue-500 p-4 rounded-lg shadow">
            <h2 className="font-titulo text-xl mb-4">
              Crear nueva publicacion
            </h2>
            <PostForm />
          </div>

          {/* Feed de publicaciones */}
          <div className="space-y-6">
            {/* Ejemplo de publicación */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-titulo text-xl mb-4">
                Publicacion de ejemplo "titulo"
              </h2>
              <p className="mb-4">
                Esta es una publicacion de ejemplo en nuestra red anti-social
                los crudos papa. Bienvenidos!
              </p>
            </div>
          </div>
        </main>

        {/* Lado derecho */}
        <div className="row-span-5 col-start-4">
          {/* Tendencias */}
          <div className="bg-secondary p-4 rounded-lg">
            <h2 className="font-titulo text-xl mb-4 text-white">Tendencias</h2>
            <div className="space-y-3">
              {["#AntiSocial", "#UNAHUR", "#Programación", "#LosCRUDos"].map(
                (tag) => (
                  <div key={tag} className="flex justify-between items-center">
                    <Link
                      to={`/etiquetas/${tag}`}
                      className="text-secondary hover:underline"
                    >
                      {tag}
                    </Link>
                    <span className="text-sm text-gray-500">10 posts</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Sugerencias para seguir */}
          <div className="p-4 rounded-lg">
            <h2 className="font-titulo text-xl mb-4">
              Sugerencias para seguir
            </h2>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <div>
                    <h3 className="font-bold">Usuario1</h3>
                    <p className="text-sm text-gray-500">@usuario1</p>
                  </div>
                </div>
                <button className="text-secondary hover:underline">
                  Seguir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
