import { useState } from "react";
import '../style.css';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulação de autenticação com dados fixos para o trabalho
    if (email === "admin@cineflow.com" && senha === "123456") {
      // Guarda o token no localStorage para simular o login (Segurança)
      localStorage.setItem("token_jwt", "mocked-jwt-token-xyz123");
      alert("Login realizado com sucesso!");
      window.location.href = "/catalogo"; // Redireciona para o catálogo
    } else {
      alert("E-mail ou senha incorretos!");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="form-cadastro" style={{ marginTop: "80px" }}>
        <h2 style={{ color: "#141414", textAlign: "center", marginBottom: "15px" }}>Entrar no CineFlow</h2>
        <input 
          type="email" 
          placeholder="E-mail (admin@cineflow.com)" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Senha (123456)" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          required 
        />
        <button type="submit" className="btn-submit">Entrar</button>
      </form>
    </div>
  );
}