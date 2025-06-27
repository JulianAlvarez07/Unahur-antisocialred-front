import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
    const [contenido, setContenido] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const post = {
            contenido: contenido,
            userId: 1, // TODO: Cambiar por el id del usuario logueado
        }
        const response = await fetch('http://localhost:3001/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
        if (response.ok) {
            console.log('Post creado exitosamente');
            setContenido('');

        } else {
            console.error('Error al crear el post');
        }
    }
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Nueva Publicación</h2>

            <div className="space-y-4">
                {/* Textarea for post content */}
                <div>
                    <label
                        htmlFor="contenido"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        ¿Qué estás pensando?
                    </label>
                    <textarea
                        id="contenido"
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        rows={4}
                        maxLength={2000}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        placeholder="Escribe tu publicación aquí..."
                    />
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">
                            {contenido.length}/2000 caracteres
                        </span>
                        {contenido.length > 1800 && (
                            <span className="text-xs text-orange-500">
                                Casi al límite
                            </span>
                        )}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-end pt-4 border-t border-gray-200">
                    {/* Publish button */}
                    <button
                        onClick={handleSubmit}
                        disabled={!contenido.trim()}
                        className={`
                            px-6 py-2 rounded-md font-medium text-white transition-colors duration-200
                            ${!contenido.trim()
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            }
                        `}
                    >
                        Publicar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostForm;