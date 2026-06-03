export const filmeService = {
  // Função que busca filmes de uma API externa (Aula 07)
  async listarTodos() {
    // Buscando dados de uma URL externa via GET
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6");
    const dados = await response.json();
    
    // Adaptando os dados da API para o formato do seu catálogo
    return dados.map(item => ({
      titulo: item.title.substring(0, 15),
      genero: "Cinema",
      ano: 2024,
      capa: `https://picsum.photos/seed/${item.id}/200/300` 
    }));
  }
};