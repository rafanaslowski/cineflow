import { useState, useContext } from "react";
// ALTERADO: Importando ferramentas para navegação interna e para ler o contexto global
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import '../style.css';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  // ALTERADO: Inicializando o redirecionador do React Router e consumindo a função global
  const navigate = useNavigate();
  const { loginSecreto } = useContext(AuthContext);

// ADICIONADO O ASYNC AQUI
const handleLogin = async (e) => {
  e.preventDefault();
  
  // ADICIONADO O AWAIT AQUI (Espera o Axios ir no MySQL e voltar)
  const logadoComSucesso = await loginSecreto(email, senha);

  if (logadoComSucesso) {
    alert("Login realizado com sucesso via Contexto Global!");
    navigate("/cadastro"); 
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