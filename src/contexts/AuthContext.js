import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Criando o Contexto de Autenticação ensinado no Slide 09
export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Quando o site carrega, verifica se já existe um token salvo no navegador
    const tokenSalvo = localStorage.getItem("token_jwt");
    const emailSalvo = localStorage.getItem("user_email");
    const nomeSalvo = localStorage.getItem("user_nome");

    if (tokenSalvo && emailSalvo) {
      // Restaura a sessão global ativa com as informações guardadas do MySQL
      setUser({ email: emailSalvo, nome: nomeSalvo });
    }
    setLoading(false);
  }, []);

  // Função para realizar o login global buscando dados da API real
  const loginSecreto = async (email, senha) => {
    try {
      // Faz a chamada POST na rota do servidor Express backend
      const response = await axios.post("http://localhost:3001/login", { email, senha });

      if (response.data.auth) {
        // Armazena com segurança os dados de sessão no localStorage do navegador
        localStorage.setItem("token_jwt", response.data.token_jwt);
        localStorage.setItem("user_email", response.data.email);
        localStorage.setItem("user_nome", response.data.nome);

        // Atualiza o estado do usuário global no React
        setUser({ email: response.data.email, nome: response.data.nome });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro na autenticação real do MySQL:", error.response?.data?.mensagem || error.message);
      return false;
    }
  };

  // Função para realizar o logout global (Limpeza de sessão completa)
  const logoutSecreto = () => {
    localStorage.removeItem("token_jwt");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_nome");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, loginSecreto, logoutSecreto, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}