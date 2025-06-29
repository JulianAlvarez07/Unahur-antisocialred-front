import { useState } from 'react';
import { useAuth } from '@/context/AuthProvider';

const PostForm = () => {
    const [contenido, setContenido] = useState('');
    const auth = useAuth();
    const usuario = auth?.usuario;
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!usuario) {
            alert("Debes iniciar sesión para crear una publicación");
            return;
        }

        const post = {
            contenido: contenido,
            userId: usuario.id,
        };

        try {
            const response = await fetch('http://localhost:3001/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });

            if (response.ok) {
                console.log('Post creado exitosamente');
                setContenido('');
                // Opcional: recargar la página o navegar
                window.location.reload();
            } else {
                console.error('Error al crear el post');
                alert('Error al crear la publicación');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor');
        }
    };
    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Textarea for post content */}
                <div>
                    <label
                        htmlFor="contenido"
                        className="block text-sm md:text-base font-medium text-gray-700 mb-2"
                    >
                        ¿Qué estás pensando?
                    </label>
                    <textarea
                        id="contenido"
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        rows={4}
                        maxLength={2000}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm md:text-base"
                        placeholder="Escribe tu publicación aquí..."
                    />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1 space-y-1 sm:space-y-0">
                        <span className="text-xs md:text-sm text-gray-500">
                            {contenido.length}/2000 caracteres
                        </span>
                        {contenido.length > 1800 && (
                            <span className="text-xs md:text-sm text-orange-500">
                                Casi al límite
                            </span>
                        )}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-end pt-4 border-t border-gray-200">
                    {/* Publish button */}
                    <button
                        type="submit"
                        disabled={!contenido.trim()}
                        className={`
                            px-4 md:px-6 py-2 md:py-3 rounded-md font-medium text-white transition-colors duration-200 text-sm md:text-base
                            ${!contenido.trim()
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            }
                        `}
                    >
                        Publicar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;