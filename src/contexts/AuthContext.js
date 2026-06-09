import { createContext, useState, useEffect } from "react";

// Criando o Contexto de Autenticação ensinado no Slide 09
export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Quando o site carrega, verifica se já existe um token salvo no navegador
    const tokenSalvo = localStorage.getItem("token_jwt");
    if (tokenSalvo) {
      // Simula que o usuário administrador está ativo na sessão global
      setUser({ email: "admin@cineflow.com", role: "admin" });
    }
    setLoading(false);
  } , []);

  // Função para realizar o login global
  const loginSecreto = (email, senha) => {
    if (email === "admin@cineflow.com" && senha === "123456") {
      localStorage.setItem("token_jwt", "seu-token-jwt-falsificado-da-faculdade");
      setUser({ email: "admin@cineflow.com", role: "admin" });
      return true;
    }
    return false;
  };

  // Função para realizar o logout global (Limpeza de sessão)
  const logoutSecreto = () => {
    localStorage.removeItem("token_jwt");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, loginSecreto, logoutSecreto, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}