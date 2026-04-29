export default function FormCadastro() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Filme enviado para análise!");
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Cadastrar Novo Filme</h2>
      <form onSubmit={handleSubmit} className="form-cadastro">
        <input type="text" placeholder="Título do Filme" required />
        <input type="text" placeholder="Gênero" required />
        <input type="number" placeholder="Ano de Lançamento" required />
        <input type="url" placeholder="URL da Capa (Imagem)" required />
        <button type="submit" className="btn-submit">
          Cadastrar Filme
        </button>
      </form>
    </div>
  );
}