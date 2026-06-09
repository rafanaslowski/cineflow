import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/filmes" className="nav-link">Catálogo</Link>
        <Link to="/sobre" className="nav-link">Equipe</Link>
        <Link to="/cadastro" className="nav-link">Cadastro</Link>
        <Link to="/login" className="nav-link" style={{ marginLeft: "auto", color: "#ffffff" }}>Login</Link>
        <Link to="/cadastro-usuario" className="nav-link">Cadastrar Usuário</Link>
      </nav>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
}