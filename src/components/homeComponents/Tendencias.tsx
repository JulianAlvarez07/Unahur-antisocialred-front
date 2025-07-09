import { TrendingUp, Hash, Plus } from "lucide-react";
import { Tag, Post } from "@/types/interfaces";
import { motion } from "framer-motion";
import { crearTag } from "../PostTag";
import { useState, useEffect } from "react";
import { buildApiUrl } from "@/config/api";

const fadeInUp = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

interface TendenciasProps {
  tags: Tag[];
  loading: boolean;
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

interface TagWithPostCount extends Tag {
  postCount: number;
}

export const Tendencias = ({ tags, loading, setTags }: TendenciasProps) => {
  const [showForm, setShowForm] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [tagsWithCount, setTagsWithCount] = useState<TagWithPostCount[]>([]);

  useEffect(() => {
    const fetchTagsWithPostCount = async () => {
      try {
        // Obtener todos los posts
        const response = await fetch(buildApiUrl("/post"));
        const posts = (await response.json()) as Post[];

        // Contar cuántas veces aparece cada tag
        const tagCounts = new Map<number, number>();
        posts.forEach((post: Post) => {
          post.tags?.forEach((tag: Tag) => {
            const currentCount = tagCounts.get(tag.id) || 0;
            tagCounts.set(tag.id, currentCount + 1);
          });
        });

        // Combinar los tags con sus conteos
        const tagsWithPostCounts: TagWithPostCount[] = tags.map((tag) => ({
          ...tag,
          postCount: tagCounts.get(tag.id) || 0,
        }));

        // Ordenar por cantidad de posts (descendente)
        const sortedTags = tagsWithPostCounts.sort(
          (a, b) => b.postCount - a.postCount
        );
        setTagsWithCount(sortedTags);
      } catch (error) {
        console.error("Error al obtener el conteo de posts por tag:", error);
      }
    };

    if (tags.length > 0) {
      fetchTagsWithPostCount();
    }
  }, [tags]);

  // Tomar los 5 tags más usados
  const trendingTags = tagsWithCount.slice(0, 5);

  const handleCrearTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) return;

    setIsCreating(true);
    setError("");

    try {
      const nuevoTag = await crearTag(newTagName.trim());
      setTags((prevTags) => [...prevTags, nuevoTag]);
      setNewTagName("");
      setShowForm(false);
    } catch (error) {
      setError("Error al crear el tag. Por favor, intenta de nuevo.");
      console.error("Error al crear el tag:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <motion.div
      {...fadeInUp}
      className="bg-white rounded-lg shadow-md border border-gray-200"
    >
      <div className="p-3 md:p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <h2 className="text-lg md:text-xl font-bold font-mono">
              Tendencias
            </h2>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="p-1 rounded-full transition-colors"
            title="Crear nuevo tag"
          >
            <Plus className="w-5 h-5 text-secondary cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="p-3 md:p-4">
        {showForm && (
          <form onSubmit={handleCrearTag} className="mb-4">
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Nombre de la nueva tendencia"
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                maxLength={50}
                disabled={isCreating}
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setNewTagName("");
                    setError("");
                  }}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-400 hover:text-white rounded-md transition-colors cursor-pointer border border-gray-300"
                  disabled={isCreating}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!newTagName.trim() || isCreating}
                  className={`px-3 py-1 text-sm text-white rounded-md transition-colors ${
                    !newTagName.trim() || isCreating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-secondary cursor-pointer"
                  }`}
                >
                  {isCreating ? "Creando..." : "Crear Tendencia"}
                </button>
              </div>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-center text-gray-500">
            Cargando tendencias...
          </div>
        ) : trendingTags.length > 0 ? (
          <div className="space-y-3">
            {trendingTags.map((tag) => (
              <motion.div
                key={tag.id}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                className="flex items-center gap-2 group hover:bg-gray-50 p-2 rounded-md transition-colors"
              >
                <Hash className="w-4 h-4 text-secondary" />
                <div className="flex justify-between w-full">
                  <span className="text-gray-700 text-sm md:text-base">
                    {tag.nombreEtiqueta}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {tag.postCount} posts
                    </span>
                    <p className="text-xs text-white mt-1.5 bg-secondary px-2 py-1 rounded-md">
                      Tag
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No hay tendencias disponibles
          </div>
        )}
      </div>
    </motion.div>
  );
};
