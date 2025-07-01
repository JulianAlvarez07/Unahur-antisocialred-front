import { TrendingUp, Hash } from "lucide-react";
import { Tag } from "@/types/interfaces";
import { motion } from "framer-motion";

interface TendenciasProps {
  tags: Tag[];
  loading: boolean;
}

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

export const Tendencias = ({ tags, loading }: TendenciasProps) => {
  // Ordenar tags por cantidad de posts (simulado por ahora)
  const trendingTags = tags.slice(0, 5);

  return (
    <motion.div
      {...fadeInUp}
      className="bg-white rounded-lg shadow-md border border-gray-200"
    >
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
                  <p className="text-xs text-white mt-1.5 bg-secondary px-2 py-1 rounded-md">
                    Tag
                  </p>
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
