import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/filmes" className="nav-link">Catálogo</Link>
        <Link to="/sobre" className="nav-link">Equipe</Link>
        <Link to="/cadastro" className="nav-link">Cadastro</Link>
      </nav>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
}