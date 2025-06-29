# UnaHur Anti-Social Red - Frontend

## 📖 Descripción del Proyecto

**UnaHur Anti-Social Red** es una red social moderna desarrollada como proyecto universitario para la materia CIU (Construcción de Interfaces de Usuario).

### Tecnologías Utilizadas

- **React** - Biblioteca principal para la interfaz de usuario
- **TypeScript** - Tipado estático para mayor robustez del código
- **Vite** - Herramienta de construcción y servidor de desarrollo
- **Tailwind CSS** - Framework de CSS para diseño responsive
- **ESLint** - Linter para mantener calidad del código

## 🚀 Instrucciones para Correr en Local

### Prerrequisitos

Asegurate de tener instalados los siguientes programas:

- **Node.js** (versión 16 o superior)
- **npm** (viene incluido con Node.js)
- **Git** (para clonar el repositorio)

### Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/JulianAlvarez07/Unahur-antisocialred-front.git
   cd Unahur-antisocialred-front
   ```

2. **Instalar dependencias**
   ```bash
   npm i
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   
   La aplicación estará disponible en: [http://localhost:5173](http://localhost:5173)

### Comandos Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la construcción de producción
- `npm run lint` - Ejecuta el linter para revisar el código

## 🌐 API Utilizada

### URL Base de la API
```
https://github.com/JulianAlvarez07/back-antisocial.git
```

## 👤 Usuarios de Prueba

Para probar el sistema de login, usa cualquiera de estos usuarios con la contraseña `123456`:

- **Pedrito23** 
- **juanito123** 
- **luzmaria89** 
- **carlos_dev** 
- **sofia_mtz** 

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── CommentCard.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   ├── LoginForm.tsx
│   ├── Navbar.tsx
│   ├── Post.tsx
│   ├── PostCard.tsx
│   └── PostForm.tsx
├── context/             # Contextos de React
│   └── AuthProvider.tsx
├── pages/               # Páginas principales
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Publicaciones.tsx
│   └── Usuarios.tsx
├── routes/              # Configuración de rutas
│   └── App-router.tsx
├── types/               # Interfaces TypeScript
│   └── interfaces.ts
└── assets/              # Recursos estáticos
```