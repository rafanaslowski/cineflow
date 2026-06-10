import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import '../style.css';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  //Estado para gerenciar a exibição de feedbacks na tela
  const [feedback, setFeedback] = useState({ texto: "", tipo: "" });
  
  const navigate = useNavigate();
  const { loginSecreto } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFeedback({ texto: "", tipo: "" }); // Limpa avisos anteriores
    
    const logadoComSucesso = await loginSecreto(email, senha);

    if (logadoComSucesso) {
      setFeedback({ texto: "Acesso autorizado! Redirecionando...", tipo: "sucesso" });
      
      
      setTimeout(() => {
        navigate("/cadastro"); 
      }, 750);
    } else {
      setFeedback({ texto: "E-mail ou senha incorretos. Tente novamente.", tipo: "erro" });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="form-cadastro" style={{ marginTop: "80px" }}>
        <h2 style={{ color: "#141414", textAlign: "center", marginBottom: "15px" }}>Entrar no CineFlow</h2>
        
        {/* 🔄 RENDERIZAÇÃO CONDICIONAL DO ALERTA INTERNO */}
        {feedback.texto && (
          <div className={`alerta-container alerta-${feedback.tipo}`}>
            {feedback.texto}
          </div>
        )}

        <input 
          type="email" 
          placeholder="E-mail (ex: seu@email.com)" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          required 
        />
        <button type="submit" className="btn-submit">Entrar</button>
      </form>
    </div>
  );
}