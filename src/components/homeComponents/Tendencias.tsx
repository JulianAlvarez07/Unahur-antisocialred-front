import { TrendingUp, Hash } from "lucide-react";
import { Tag } from "@/types/interfaces";

interface TendenciasProps {
  tags: Tag[];
  loading: boolean;
}

export const Tendencias = ({ tags, loading }: TendenciasProps) => {
  // Ordenar tags por cantidad de posts (simulado por ahora)
  const trendingTags = tags.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="p-3 md:p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          <h2 className="text-lg md:text-xl font-bold font-mono">Tendencias</h2>
        </div>
      </div>
      <div className="p-3 md:p-4">
        {loading ? (
          <div className="text-center text-gray-500">
            Cargando tendencias...
          </div>
        ) : trendingTags.length > 0 ? (
          <div className="space-y-3">
            {trendingTags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-2 group hover:bg-gray-50 p-2 rounded-md transition-colors"
              >
                <Hash className="w-4 h-4 text-secondary" />
                <span className="text-gray-700 text-sm md:text-base group-hover:text-secondary transition-colors">
                  {tag.nombreEtiqueta}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No hay tendencias disponibles
          </div>
        )}
      </div>
    </div>
  );
};
