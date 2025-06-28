import { createContext, useContext, useState } from "react";

type AuthContextType = {
    usuario: string | null;
    setUsuario: (usuario: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    return (
        <AuthContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}

