import {
  Lightbulb,
  Trophy,
  Clock,
  MessageSquare,
  Code2,
  Users2,
} from "lucide-react";
import { Post, User } from "@/types/interfaces";
import { motion } from "framer-motion";

interface DatosCuriososProps {
  posts: Post[];
  users: User[];
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
      duration: 0.8,
    },
  },
};
export const DatosCuriosos = ({
  posts,
  users,
  loading,
}: DatosCuriososProps) => {
  // Calcular datos curiosos
  const usuarioMasActivo =
    !loading && users.length > 0 && posts.length > 0
      ? users.reduce((prev, current) => {
          const postsUsuarioPrev = posts.filter(
            (post) => post.userId === prev.id
          ).length;
          const postsUsuarioCurrent = posts.filter(
            (post) => post.userId === current.id
          ).length;
          return postsUsuarioPrev > postsUsuarioCurrent ? prev : current;
        })
      : null;

  const postMasComentado =
    !loading && posts.length > 0
      ? posts.reduce((prev, current) =>
          (prev.comment?.length || 0) > (current.comment?.length || 0)
            ? prev
            : current
        )
      : null;

  const postsDelUsuarioMasActivo = usuarioMasActivo
    ? posts.filter((post) => post.userId === usuarioMasActivo.id).length
    : 0;

  return (
    <motion.div
      {...fadeInUp}
      className="bg-white rounded-lg shadow-md border border-gray-200"
    >
      <div className="p-3 md:p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          <h2 className="text-lg md:text-xl font-bold font-mono">
            Datos Curiosos
          </h2>
        </div>
      </div>
      <div className="p-3 md:p-4 space-y-4">
        {loading ? (
          <div className="text-center text-gray-500">Cargando datos...</div>
        ) : (
          <>
            <div className="flex items-start gap-3">
              <Trophy className="w-5 h-5 text-yellow-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">
                  Usuario más activo
                </h3>
                <p className="text-sm text-gray-600">
                  {usuarioMasActivo
                    ? `${usuarioMasActivo.nickName} con ${postsDelUsuarioMasActivo} publicaciones`
                    : "No hay datos disponibles"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">
                  Post más comentado
                </h3>
                <p className="text-sm text-gray-600">
                  {postMasComentado
                    ? `${postMasComentado.comment?.length || 0} comentarios`
                    : "No hay datos disponibles"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">
                  Actividad reciente
                </h3>
                <p className="text-sm text-gray-600">
                  {posts.length > 0
                    ? `${posts.length} publicaciones en total`
                    : "No hay actividad reciente"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Code2 className="w-5 h-5 text-teal-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">CRUD significa</h3>
                <p className="text-sm text-gray-600">
                  Create, Read, Update, Delete
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users2 className="w-5 h-5 text-purple-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">
                  Somos "Anti-Social" porque
                </h3>
                <p className="text-sm text-gray-600">
                  Valoramos calidad sobre cantidad
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};
