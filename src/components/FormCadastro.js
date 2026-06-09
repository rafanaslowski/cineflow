import { useState } from "react"; 
// ALTERADO: Importando o serviço de filmes para conectar com o banco de dados
import { filmeService } from "../services/filmeService";

export default function FormCadastro() {
  // Gerenciamento de estado para os campos do formulário
  const [formData, setFormData] = useState({
    titulo: "",
    genero: "",
    ano: "",
    capa: ""
  });

  const [erros, setErros] = useState({}); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // limpa o erro ao digitar no campo
    if(erros[name]){
      setErros({ ...erros, [name]: ""});
    }
  };

  // Validação dos dados do formulário
  const validarFormulario = () => {
    const errosValidacao = {};
    const anoAtual = new Date().getFullYear();

    if (!formData.titulo.trim()) errosValidacao.titulo = "O título é obrigatório.";
    if (!formData.genero.trim()) errosValidacao.genero = "O gênero é obrigatório.";

    // Valida o preenchimento do ano antes de verificar o intervalo
    if (!formData.ano) {
      errosValidacao.ano = "O ano é obrigatório.";
    } else if (formData.ano < 1888 || formData.ano > anoAtual + 5) {
      errosValidacao.ano = `O ano deve ser entre 1888 e ${anoAtual + 5}.`;
    }

    //Valida URL
    try { 
      new URL(formData.capa);
    } catch (_){
      errosValidacao.capa = "A URL da capa é inválida.";
    }

    setErros(errosValidacao);
    return Object.keys(errosValidacao).length === 0; 
  };

  // ALTERADO: A função agora é assíncrona (async) porque se conecta com o Banco de Dados externo
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chama a função de validação antes de salvar os dados
    if (!validarFormulario()) {
      return; 
    }

    try {
      // MODIFICADO: Removemos o localStorage e enviamos diretamente para a Database (db.json) via Axios
      await  filmeService.cadastrar(formData);

      // Feedback de usabilidade para o usuário informando o sucesso no Banco real
      alert("Filme cadastrado com sucesso diretamente no Banco de Dados (db.json)!");

      // Limpa o formulário para um próximo cadastro
      setFormData({ titulo: "", genero: "", ano: "", capa: "" });
    } catch (error) {
      alert("Erro ao salvar o filme. Verifique se o terminal do json-server está ligado na porta 3001!");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Cadastrar Novo Filme</h2>
      <form onSubmit={handleSubmit} className="form-cadastro" noValidate>
        
        <div style={{ width: '100%' }}>
          <input 
            name="titulo"
            type="text" 
            placeholder="Título do Filme" 
            value={formData.titulo}
            onChange={handleChange}
            required 
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
          {erros.titulo && <span style={{ color: "red", fontSize: "12px", display: "block", marginTop: "4px" }}>{erros.titulo}</span>}
        </div>

        <div style={{ width: '100%' }}>
          <input 
            name="genero"
            type="text" 
            placeholder="Gênero" 
            value={formData.genero}
            onChange={handleChange}
            required 
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
          {erros.genero && <span style={{ color: "red", fontSize: "12px", display: "block", marginTop: "4px" }}>{erros.genero}</span>}
        </div>

        <div style={{ width: '100%' }}>
          <input 
            name="ano"
            type="number" 
            placeholder="Ano de Lançamento" 
            value={formData.ano}
            onChange={handleChange}
            required 
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
          {erros.ano && <span style={{ color: "red", fontSize: "12px", display: "block", marginTop: "4px" }}>{erros.ano}</span>}
        </div>

        <div style={{ width: '100%' }}>
          <input 
            name="capa"
            type="url" 
            placeholder="URL da Capa (Imagem)" 
            value={formData.capa}
            onChange={handleChange}
            required 
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
          {erros.capa && <span style={{ color: "red", fontSize: "12px", display: "block", marginTop: "4px" }}>{erros.capa}</span>}
        </div>
        
        <button type="submit" className="btn-submit" style={{ marginTop: '10px' }}>
          Cadastrar Filme
        </button>
      </form>

      <div style={{ color: 'gray', fontSize: '12px', textAlign: 'center', marginTop: '10px' }}>
        Editando: {formData.titulo}
      </div>
    </div>
  );
}