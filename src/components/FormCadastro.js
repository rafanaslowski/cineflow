import { useState } from "react"; // Importação do Hook

export default function FormCadastro() {
  // Gerenciamento de estado para os campos do formulário
  const [formData, setFormData] = useState({
    titulo: "",
    genero: "",
    ano: "",
    capa: ""
  });

  // Manipulação de dados do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // =========================================================================
    // RA3 - ADICIONADO: PERSISTÊNCIA DE DADOS (localStorage)
    // =========================================================================
    
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
      <form onSubmit={handleSubmit} className="form-cadastro">
        <input 
          name="titulo"
          type="text" 
          placeholder="Título do Filme" 
          value={formData.titulo}
          onChange={handleChange}
          required 
        />
        <input 
          name="genero"
          type="text" 
          placeholder="Gênero" 
          value={formData.genero}
          onChange={handleChange}
          required 
        />
        <input 
          name="ano"
          type="number" 
          placeholder="Ano de Lançamento" 
          value={formData.ano}
          onChange={handleChange}
          required 
        />
        <input 
          name="capa"
          type="url" 
          placeholder="URL da Capa (Imagem)" 
          value={formData.capa}
          onChange={handleChange}
          required 
        />
        
        <button type="submit" className="btn-submit">
          Cadastrar Filme
        </button>
      </form>

      <div style={{ color: 'gray', fontSize: '12px', textAlign: 'center', marginTop: '10px' }}>
        Editando: {formData.titulo}
      </div>
    </div>
  );
}