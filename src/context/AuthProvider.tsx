import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
    usuario: any | null;
    setUsuario: (usuario: any | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuarioState] = useState(null);

    // Cargar usuario desde localStorage al inicializar
    useEffect(() => {
        const savedUser = localStorage.getItem('usuario');
        if (savedUser) {
            try {
                setUsuarioState(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('usuario');
            }
        }
    }, []);

    const setUsuario = (user: any | null) => {
        setUsuarioState(user);
        if (user) {
            localStorage.setItem('usuario', JSON.stringify(user));
        } else {
            localStorage.removeItem('usuario');
        }
    };

    return (
        <AuthContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

