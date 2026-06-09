import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import FilmesPage from "./pages/FilmesPage";
import SobrePage from "./pages/SobrePage";
import FormCadastro from "./components/FormCadastro";
import LoginPage from "./pages/LoginPage";
import './style.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="filmes" element={<FilmesPage />} />
          <Route path="sobre" element={<SobrePage />} />
          <Route path="cadastro" element={<FormCadastro />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


