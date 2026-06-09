import { useState } from "react";

export default function FormUsuario() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: ""
  });

  const [erros, setErros] = useState({});
  const [carregandoCep, setCarregandoCep] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (erros[name]) {
      setErros({ ...erros, [name]: "" });
    }
  };

  // Busca automática na API ViaCEP
  const handleCepBlur = async () => {
    const cepLimpo = formData.cep.replace(/\D/g, "");
    
    if (cepLimpo.length !== 8) {
      setErros(prev => ({ ...prev, cep: "O CEP deve conter 8 dígitos." }));
      return;
    }

    try {
      setCarregandoCep(true);
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const dados = await response.json();

      if (dados.erro) {
        setErros(prev => ({ ...prev, cep: "CEP não encontrado." }));
        setFormData(prev => ({ ...prev, logradouro: "", bairro: "", cidade: "" }));
      } else {
        setFormData(prev => ({
          ...prev,
          logradouro: dados.logradouro,
          bairro: dados.bairro,
          cidade: `${dados.localidade} - ${dados.uf}`
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    } finally {
      setCarregandoCep(false);
    }
  };

  const validarFormulario = () => {
    const errosValidacao = {};

    if (!formData.nome.trim()) errosValidacao.nome = "O nome é obrigatório.";
    if (!formData.email.includes("@")) errosValidacao.email = "Insira um e-mail válido.";
    if (formData.senha.length < 6) errosValidacao.senha = "A senha deve ter ao menos 6 caracteres.";
    if (!formData.logradouro) errosValidacao.cep = "Digite um CEP válido para carregar o endereço.";

    setErros(errosValidacao);
    return Object.keys(errosValidacao).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    console.log("Usuário cadastrado:", formData);
    alert(`Usuário ${formData.nome} cadastrado com sucesso!`);
    
    setFormData({ nome: "", email: "", senha: "", cep: "", logradouro: "", bairro: "", cidade: "" });
  };

  return (
    <div className="container">
      {/* Usando a sua classe form-cadastro para manter o padrão visual */}
      <form onSubmit={handleSubmit} className="form-cadastro" style={{ marginTop: "50px", color: "#141414" }} noValidate>
        <h2 style={{ textAlign: 'center', margin: "0 0 10px 0" }}>Cadastro de Usuário</h2>
        
        <div style={{ width: '100%' }}>
          <input 
            type="text" name="nome" placeholder="Nome Completo" 
            value={formData.nome} onChange={handleChange} style={{ width: '100%', boxSizing: 'border-box' }}
          />
          {erros.nome && <span className="erro-texto">{erros.nome}</span>}
        </div>

        <div style={{ width: '100%' }}>
          <input 
            type="email" name="email" placeholder="E-mail" 
            value={formData.email} onChange={handleChange} style={{ width: '100%', boxSizing: 'border-box' }}
          />
          {erros.email && <span className="erro-texto">{erros.email}</span>}
        </div>

        <div style={{ width: '100%' }}>
          <input 
            type="password" name="senha" placeholder="Senha" 
            value={formData.senha} onChange={handleChange} style={{ width: '100%', boxSizing: 'border-box' }}
          />
          {erros.senha && <span className="erro-texto">{erros.senha}</span>}
        </div>

        <div style={{ width: '100%' }}>
          <input 
            type="text" name="cep" placeholder="CEP (Apenas números)" 
            value={formData.cep} onChange={handleChange} onBlur={handleCepBlur} maxLength="9"
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
          {carregandoCep && <span style={{ color: "#0D21A1", fontSize: "12px", display: "block", marginTop: "4px" }}>Buscando CEP...</span>}
          {erros.cep && <span className="erro-texto">{erros.cep}</span>}
        </div>

        {/* Painel com o endereço retornado pelo ViaCEP */}
        {formData.logradouro && (
          <div className="endereco-box">
            <p style={{ margin: "4px 0" }}><strong>Rua:</strong> {formData.logradouro}</p>
            <p style={{ margin: "4px 0" }}><strong>Bairro:</strong> {formData.bairro}</p>
            <p style={{ margin: "4px 0" }}><strong>Cidade:</strong> {formData.cidade}</p>
          </div>
        )}
        
        <button type="submit" className="btn-submit">
          Cadastrar Usuário
        </button>
      </form>
    </div>
  );
}