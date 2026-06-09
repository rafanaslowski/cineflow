import { useState } from "react"; // Importação do Hook

export default function FormCadastro() {
  // Gerenciamento de estado para os campos do formulário
  const [formData, setFormData] = useState({
    titulo: "",
    genero: "",
    ano: "",
    capa: ""
  });

  // AJUSTE 1: Inicializado como objeto {} e não array []
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

    //Valida Titulo e Genero
    if (!formData.titulo.trim()) errosValidacao.titulo = "O título é obrigatório.";
    if (!formData.genero.trim()) errosValidacao.genero = "O gênero é obrigatório.";

    // AJUSTE 2: Removida a negação "!" da frente do formData.ano
    if (formData.ano < 1888 || formData.ano > anoAtual + 5) {
      errosValidacao.ano = `O ano deve ser entre 1888 e ${anoAtual + 5}.`;
    }

    //Valida URL
    try { 
      new URL(formData.capa);
    } catch (_){
      errosValidacao.capa = "A URL da capa é inválida.";
    }

    setErros(errosValidacao);
    return Object.keys(errosValidacao).length === 0; // Retorna true se não houver erros
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Chama a função de validação antes de salvar os dados
    if (!validarFormulario()) {
      return; // Se houver erros, não prossegue com o cadastro
    }

    // 1. Busca a lista de filmes que já existe no navegador. Se não existir, cria um array vazio []
    const filmesSalvos = JSON.parse(localStorage.getItem("meusFilmes")) || [];

    // 2. Adiciona o novo filme (formData) que você acabou de preencher na lista
    filmesSalvos.push(formData);

    // 3. Salva a lista de volta no navegador convertida em texto (String)
    localStorage.setItem("meusFilmes", JSON.stringify(filmesSalvos));

    // Feedback de usabilidade para o usuário
    alert("Filme cadastrado com sucesso e salvo no sistema!");

    // Limpa o formulário para um próximo cadastro
    setFormData({ titulo: "", genero: "", ano: "", capa: "" });
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Cadastrar Novo Filme</h2>
      <form onSubmit={handleSubmit} className="form-cadastro" noValidate>
        
        {/* AJUSTE 3: Adicionado spans para renderizar as mensagens de erro na tela */}
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