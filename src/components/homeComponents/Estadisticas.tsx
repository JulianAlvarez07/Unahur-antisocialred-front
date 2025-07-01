import { BarChart3, Users, FileText, MessageSquare, Tags } from "lucide-react";
import { Post, User, Tag } from "@/types/interfaces";
import { motion } from "framer-motion";

interface EstadisticasProps {
  loading: boolean;
  users: User[];
  posts: Post[];
  tags: Tag[];
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
      duration: 0.6,
    },
  },
};

export const Estadisticas = ({
  loading,
  users,
  posts,
  tags,
}: EstadisticasProps) => {
  return (
    <motion.div
      {...fadeInUp}
      className="bg-white rounded-lg shadow-md border border-gray-200"
    >
      <div className="p-3 md:p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          <h2 className="text-lg md:text-xl font-bold font-mono">
            CRUDos Stats
          </h2>
        </div>
      </div>
      <div className="p-3 md:p-4 space-y-3 md:space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="text-gray-600 text-sm md:text-base">
              Miembros registrados
            </span>
          </div>
          <span className="font-bold text-secondary">
            {loading ? "..." : users.length}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="text-gray-600 text-sm md:text-base">
              Publicaciones
            </span>
          </div>
          <span className="font-bold text-secondary">
            {loading ? "..." : posts.length}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span className="text-gray-600 text-sm md:text-base">
              Comentarios
            </span>
          </div>
          <span className="font-bold text-secondary">
            {loading
              ? "..."
              : posts.reduce(
                  (total, post) => total + (post.comment?.length || 0),
                  0
                )}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Tags className="w-4 h-4" />
            <span className="text-gray-600 text-sm md:text-base">
              Tags disponibles
            </span>
          </div>
          <span className="font-bold text-secondary">
            {loading ? "..." : tags.length}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
