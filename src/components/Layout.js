import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Layout() {
  const { authenticated, user, logoutSecreto } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSair = () => {
    logoutSecreto();
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/filmes" className="nav-link">Catálogo</Link>
        <Link to="/sobre" className="nav-link">Equipe</Link>
        <Link to="/cadastro" className="nav-link">Cadastro</Link>
        
        {/* RENDERIZAÇÃO CONDICIONAL PARCIAL DOS BOTÕES DE ACESSO */}
        {!authenticated ? (
          <>
            <Link to="/login" className="nav-link" style={{ marginLeft: "auto", color: "#ffffff" }}>Login</Link>
            <Link to="/cadastro-usuario" className="nav-link">Cadastrar Usuário</Link>
          </>
        ) : (
          <>
            <span className="usuario-logado-tag" style={{ marginLeft: "auto" }}>
             Olá, {user?.nome ? user.nome.split(" ")[0] : "Usuário"}
            </span>
            <button onClick={handleSair} className="btn-sair">
              Sair
            </button>
          </>
        )}
      </nav>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
}