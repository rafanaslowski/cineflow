import { useState } from "react"; // ADICIONADO: Importação do Hook

export default function FormCadastro() {
  // ADICIONADO: Gerenciamento de estado (Aula 05)
  const [formData, setFormData] = useState({
    titulo: "",
    genero: "",
    ano: "",
    capa: ""
  });

  // ADICIONADO: Manipulação de dados (Aula 05)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mostra no console os dados que foram capturados pelo estado
    console.log("Dados salvos no estado:", formData);
    
    alert("Filme enviado para análise!"); // MANTIDO: Sua mensagem original
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Cadastrar Novo Filme</h2>
      <form onSubmit={handleSubmit} className="form-cadastro">
        {/* ADICIONADO: name, value e onChange em cada campo abaixo */}
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

      {/* ADICIONADO: Apenas para você ver o estado mudando enquanto digita (Opcional) */}
      <div style={{ color: 'gray', fontSize: '12px', textAlign: 'center', marginTop: '10px' }}>
        Editando: {formData.titulo}
      </div>
    </div>
  );
}