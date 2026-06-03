const API_KEY = "f8c262a3375db70e1589ff0891021d4c"; 

// Dicionário mapeando os IDs numéricos do TMDB para os nomes em português
const MAPEAMENTO_GENEROS = {
  28: "Ação", 12: "Aventura", 16: "Animação", 35: "Comédia",
  80: "Crime", 99: "Documentário", 18: "Drama", 10751: "Família",
  14: "Fantasia", 36: "História", 27: "Terror", 10402: "Música",
  9648: "Mistério", 10749: "Romance", 878: "Ficção Científica",
  10770: "Cinema TV", 53: "Suspense", 10752: "Guerra", 37: "Faroeste"
};

export const filmeService = {
  async listarTodos() {
    // Buscando os filmes populares do momento
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro ao buscar filmes no TMDB");
    }
    
    const dados = await response.json();
    
    return dados.results.map(item => {

      const nomeFilme = item.title;

      // 2. RESOLVENDO O GÊNERO DINÂMICO: Pega o primeiro ID da lista e busca no nosso dicionário
      const primeiroIdGenero = item.genre_ids && item.genre_ids[0];
      const generoDinamico = MAPEAMENTO_GENEROS[primeiroIdGenero] || "Cinema";

      // 3. RESOLVENDO O ANO DINÂMICO
      const anoLancamento = item.release_date ? item.release_date.split("-")[0] : "2026";

      return {
        titulo: nomeFilme,
        genero: generoDinamico, // Agora exibe "Ação", "Terror", "Suspense", etc.
        ano: anoLancamento,
        capa: item.poster_path 
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
          : "https://via.placeholder.com/500x750?text=Sem+Capa"
      };
    });
  }
};