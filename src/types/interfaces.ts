// Interfaces comunes para toda la aplicación

export interface User {
  id: number;
  nickName: string;
  nombre: string;
  email: string;
  edad?: number;
  fechaNacimiento?: string;
  createdAt?: string;
  updatedAt?: string;
  descripcion?: string; // Descripción guardada en localStorage
}

export interface Comment {
  id: number;
  comentario: string;
  userIdComment: number;
  postIdComment: number;
  fecha: string;
  visible: boolean;
  user?: {
    nickName: string; // Cambiado de nickname a nickName
    nombre: string;
  };
  nickName?: string; // Campo adicional para compatibilidad
}

export interface Post {
  id: number;
  contenido: string;
  userId: number;
  fecha: string;
  user: User;
  comment: Comment[];
  post_images?: PostImage[];
  tags?: Tag[];
}

export interface Tag {
  id: number;
  nombreEtiqueta: string;
}

export interface PostImage {
  id: number;
  url: string;
  postId: number;
}

// Interfaces para componentes (formato adaptado)
export interface CommentForComponent {
  userId: number;
  contenido: string;
  nickName?: string;
  user?: {
    nickName: string;
    nombre: string;
  };
}
export interface UserForComponent {
  nickName: string;
  nombre: string;
}
