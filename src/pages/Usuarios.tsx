import { useState, useEffect } from "react";

interface User {
  id: number;
  nickName: string;
  createdAt: string;
  updatedAt: string;
}

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        console.log("Intentando cargar usuarios...");
        const response = await fetch("http://localhost:3001/users");
        console.log("Respuesta del servidor:", response.status, response.statusText);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Usuarios cargados:", data);
        setUsuarios(data);
      } catch (error) {
        console.error("Error detallado:", error);
        setError(`Error al cargar la lista de usuarios: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="font-titulo text-center text-4xl mt-4 mb-8">Usuarios</h1>
        <div className="text-center">
          <p>Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="font-titulo text-center text-4xl mt-4 mb-8">Usuarios</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="font-titulo text-center text-4xl mt-4 mb-8">Usuarios</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {usuario.nickName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {usuario.nickName}
                </h3>
                <p className="text-sm text-gray-500">
                  Miembro desde {new Date(usuario.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {usuarios.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay usuarios registrados aún.</p>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
