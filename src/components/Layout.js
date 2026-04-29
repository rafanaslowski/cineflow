import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  const navStyle = { padding: '20px', background: '#1a1a1a', color: 'white', display: 'flex', gap: '15px' };
  const linkStyle = { color: 'white', textDecoration: 'none', fontWeight: 'bold' };

  return (
    <div>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/filmes" style={linkStyle}>Catálogo</Link>
        <Link to="/sobre" style={linkStyle}>Sobre a Equipe</Link>
        <Link to="/cadastro" style={linkStyle}>Cadastro</Link>
      </nav>
      <div style={{ padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
}