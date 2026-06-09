import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import FilmesPage from "./pages/FilmesPage";
import SobrePage from "./pages/SobrePage";
import FormCadastro from "./components/FormCadastro";
import LoginPage from "./pages/LoginPage";
import './style.css';

// ADICIONADO: Importações novas de segurança baseadas no Slide 08 e 09
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    // 1. ALTERADO: Envelopamos toda a aplicação com o Provedor Global de Autenticação (Slide 09)
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="filmes" element={<FilmesPage />} />
            <Route path="sobre" element={<SobrePage />} />
            <Route path="login" element={<LoginPage />} />
            
            {/* 2. ALTERADO: Protegemos a sua rota de cadastro usando o <PrivateRoute> (Página 26 do Slide 08) */}
            <Route 
              path="cadastro" 
              element={
                <PrivateRoute>
                  <FormCadastro />
                </PrivateRoute>
              } 
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}