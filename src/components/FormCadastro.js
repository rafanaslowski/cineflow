export default function FormCadastro() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Filme enviado para análise! (Simulação do RA1)");
  };

  const formStyle = {
    maxWidth: '400px',
    margin: '30px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>🍿 Cadastrar Novo Filme</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input type="text" placeholder="Título do Filme" required style={{ padding: '10px' }} />
        <input type="text" placeholder="Gênero" required style={{ padding: '10px' }} />
        <input type="number" placeholder="Ano de Lançamento" required style={{ padding: '10px' }} />
        <input type="url" placeholder="URL da Capa (Imagem)" required style={{ padding: '10px' }} />
        <button type="submit" style={{ 
          padding: '10px', 
          backgroundColor: '#e50914', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Cadastrar Filme
        </button>
      </form>
    </div>
  );
}