import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import FilmesPage from "./pages/FilmesPage";
import SobrePage from "./pages/SobrePage";
import FormCadastro from "./components/FormCadastro";
import LoginPage from "./pages/LoginPage";
import './style.css';

// Importações de segurança baseadas no Slide 08 e 09
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

// ADICIONADO: Importando a página nova de usuários que criamos no passo anterior
import UsuarioPage from "./pages/UsuarioPage";

export default function App() {
  return (
    // 1. Envelopamos toda a aplicação com o Provedor Global de Autenticação (Slide 09)
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* O Layout garante que o Header/Navbar apareça em todas as rotas filhas abaixo */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="filmes" element={<FilmesPage />} />
            <Route path="sobre" element={<SobrePage />} />
            <Route path="login" element={<LoginPage />} />
            
            {/* 2. Rota Protegida: Cadastro de Filmes */}
            <Route 
              path="cadastro" 
              element={
                <PrivateRoute>
                  <FormCadastro />
                </PrivateRoute>
              } 
            />

            {/* 3. ADICIONADO: Rota Protegida e com Header para o Cadastro de Usuários */}
            <Route 
              path="cadastro-usuario" 
              element={
                <PrivateRoute>
                  <UsuarioPage />
                </PrivateRoute>
              } 
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}