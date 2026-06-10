import { useState } from "react";
import axios from "axios";
import { useFeedback } from "../hooks/useFeedback";
// 1. Importar o hook useForm
import { useForm } from "../hooks/useForm";

export default function FormUsuario() {
  // 2. Inicializar o useForm com os campos do usuário
  const { formData, setFormData, handleChange, resetForm } = useForm({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: ""
  });

  const [erros, setErros] = useState({});
  const [carregandoCep, setCarregandoCep] = useState(false);
  const { feedback, mostrarFeedback, limparFeedback } = useFeedback();

  // 3. Criamos uma função customizada de mudança para interceptar as regras do Nome e CPF
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Regra: Bloquear números e caracteres especiais no nome
    if (name === "nome") {
      const apenasLetras = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "");
      setFormData((prev) => ({ ...prev, nome: apenasLetras }));
    }
    // Regra: Máscara visual do CPF (000.000.000-00)
    else if (name === "cpf") {
      const cpfMascarado = value
        .replace(/\D/g, "") 
        .replace(/(\d{3})(\d)/, "$1.$2") 
        .replace(/(\d{3})(\d)/, "$1.$2") 
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); 
      setFormData((prev) => ({ ...prev, cpf: cpfMascarado }));
    } 
    // Para todos os outros campos comuns (email, senha, cep), usamos o handleChange padrão do Hook!
    else {
      handleChange(e);
    }
    
    // Limpa o erro do campo que está sendo digitado
    if (erros[name]) {
      setErros({ ...erros, [name]: "" });
    }
  };

  const validarCPF = (cpf) => {
    const cpfLimpo = cpf.replace(/\D/g, "");

    if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;
    if (digitoVerificador1 !== parseInt(cpfLimpo.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
    if (digitoVerificador2 !== parseInt(cpfLimpo.charAt(10))) return false;

    return true;
  };

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
        setErros(prev => ({ ...prev, cep: "O CEP deve ser um CEP válido." }));
        setFormData(prev => ({ ...prev, logradouro: "", bairro: "", cidade: "" }));
      } else {
        // Injetando os dados do ViaCEP usando o setFormData do nosso Hook
        setFormData(prev => ({
          ...prev,
          logradouro: dados.logradouro,
          bairro: dados.bairro,
          cidade: `${dados.localidade} - ${dados.uf}`
        }));
        setErros(prev => ({ ...prev, cep: "" }));
      }
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    } finally {
      setCarregandoCep(false);
    }
  };

  const validarFormulario = () => {
    const errosValidacao = {};

    if (!formData.nome.trim()) {
      errosValidacao.nome = "O nome é obrigatório.";
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/.test(formData.nome.trim())) {
      errosValidacao.nome = "Nao pode ter menos de 3 letras e nao pode ter numeros ou caracteres especiais.";
    }

    if (!formData.cpf) {
      errosValidacao.cpf = "O CPF é obrigatório.";
    } else if (!validarCPF(formData.cpf)) {
      errosValidacao.cpf = "Deve ser um CPF valido.";
    }

    if (!formData.email.trim()) {
      errosValidacao.email = "O e-mail é obrigatório.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errosValidacao.email = "Deve ser um email valido.";
    }

    if (!formData.senha) {
      errosValidacao.senha = "A senha é obrigatória.";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/.test(formData.senha)) {
      errosValidacao.senha = "Deve ter numeros, letras (maiusculas e minusculas) e um caractere especial.";
    }

    const cepLimpo = formData.cep.replace(/\D/g, "");
    if (!formData.cep) {
      errosValidacao.cep = "O CEP é obrigatório.";
    } else if (cepLimpo.length !== 8) {
      errosValidacao.cep = "O CEP deve conter 8 dígitos.";
    } else if (!formData.logradouro) {
      errosValidacao.cep = "O CEP deve ser um CEP válido.";
    }

    setErros(errosValidacao);
    return Object.keys(errosValidacao).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    limparFeedback();

    if (!validarFormulario()) return;

    try {
      await axios.post("http://localhost:3001/usuarios", formData);
      
      mostrarFeedback(`Usuário ${formData.nome} cadastrado com sucesso!`, "sucesso");
      
      // 4. Resetar todos os campos do formulário usando a função do Hook
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      mostrarFeedback("Erro ao conectar com o banco de dados. O usuário não foi cadastrado.", "erro");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-cadastro" style={{ marginTop: "30px", color: "#141414" }} noValidate>
        <h2 style={{ textAlign: 'center', margin: "0 0 10px 0" }}>Cadastro de Usuário</h2>
        
        {feedback.texto && (
          <div className={`alerta-container alerta-${feedback.tipo}`}>
            {feedback.texto}
          </div>
        )}
        
        <div style={{ width: '100%' }}>
          <input 
            type="text" name="nome" placeholder="Nome Completo" 
            value={formData.nome} onChange={handleInputChange} style={{ width: '100%', boxSizing: 'border-box' }}
          />
          {erros.nome && <span className="erro-texto">{erros.nome}</span>}
        </div>

        <div style={{ width: '100%' }}>
          <input 
            type="text" name="cpf" placeholder="CPF" 
            value={formData.cpf} onChange={handleInputChange} maxLength="14"
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
          {erros.cpf && <span className="erro-texto">{erros.cpf}</span>}
        </div>

        <div style={{ width: '100%' }}>
          <input 
            type="email" name="email" placeholder="E-mail" 
            value={formData.email} onChange={handleInputChange} style={{ width: '100%', boxSizing: 'border-box' }}
          />
          {erros.email && <span className="erro-texto">{erros.email}</span>}
        </div>

        <div style={{ width: '100%' }}>
          <input 
            type="password" name="senha" placeholder="Senha" 
            value={formData.senha} onChange={handleInputChange} style={{ width: '100%', boxSizing: 'border-box' }}
          />
          {erros.senha && <span className="erro-texto">{erros.senha}</span>}
        </div>

        <div style={{ width: '100%' }}>
          <input 
            type="text" name="cep" placeholder="CEP" 
            value={formData.cep} onChange={handleInputChange} onBlur={handleCepBlur} maxLength="9"
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
          {carregandoCep && <span style={{ color: "#0D21A1", fontSize: "12px", display: "block", marginTop: "4px" }}>Buscando CEP...</span>}
          {erros.cep && <span className="erro-texto">{erros.cep}</span>}
        </div>

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