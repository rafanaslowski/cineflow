import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

// Componente de Proteção de Rotas baseado na página 24 do Slide 08
export default function PrivateRoute({ children }) {
  const { authenticated, loading } = useContext(AuthContext);

  // Se o contexto ainda estiver verificando o localStorage, exibe uma mensagem de espera
  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Carregando segurança...</div>;
  }

  // Se NÃO estiver autenticado, redireciona automaticamente para a página de login
  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  // Se estiver autenticado, libera a página que o usuário tentou acessar
  return children;
}