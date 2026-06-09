import axios from 'axios';

const API_KEY = "f8c262a3375db70e1589ff0891021d4c"; 

// URL do nosso banco de dados local (JSON Server) criado na porta 3001
const URL_BANCO_LOCAL = "http://localhost:3001/filmes";

// Dicionário mapeando os IDs numéricos do TMDB para os nomes em português
const MAPEAMENTO_GENEROS = {
  28: "Ação", 12: "Aventura", 16: "Animação", 35: "Comédia",
  80: "Crime", 99: "Documentário", 18: "Drama", 10751: "Família",
  14: "Fantasia", 36: "História", 27: "Terror", 10402: "Música",
  9648: "Mistério", 10749: "Romance", 878: "Ficção Científica",
  10770: "Cinema TV", 53: "Suspense", 10752: "Guerra", 37: "Faroeste"
};

export const filmeService = {
  // 1. ALTERADO: Agora lista os filmes do TMDB e junta com os do seu Banco Local (db.json)
  async listarTodos() {
    try {
      // --- PARTE A: BUSCANDO DO BANCO DE DADOS LOCAL (db.json) via AXIOS ---
      let filmesLocais = [];
      try {
        const responseLocal = await axios.get(URL_BANCO_LOCAL);
        filmesLocais = responseLocal.data; // Pega os filmes que VOCÊ cadastrou
      } catch (errLocal) {
        console.error("Aviso: json-server desligado. Mostrando apenas TMDB.", errLocal);
      }

      // --- PARTE B: BUSCANDO DA API EXTERNA (TMDB) via FETCH ---
      const urlTMDB = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`;
      const responseTMDB = await fetch(urlTMDB);

      if (!responseTMDB.ok) {
        throw new Error("Erro ao buscar filmes no TMDB");
      }
      
      const dadosTMDB = await responseTMDB.json();
      
      const filmesTMDB = dadosTMDB.results.map(item => {
        const nomeFilme = item.title;
        const primeiroIdGenero = item.genre_ids && item.genre_ids[0];
        const generoDinamico = MAPEAMENTO_GENEROS[primeiroIdGenero] || "Cinema";
        const anoLancamento = item.release_date ? item.release_date.split("-")[0] : "2026";

        return {
          titulo: nomeFilme,
          genero: generoDinamico,
          ano: anoLancamento,
          capa: item.poster_path 
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
            : "https://via.placeholder.com/500x750?text=Sem+Capa"
        };
      });

      // --- PARTE C: UNIFICAÇÃO (Garantia de Consistência Geral) ---
      // Retorna uma lista só: seus cadastros primeiro, seguidos pelos do TMDB
      return [...filmesLocais, ...filmesTMDB];

    } catch (error) {
      console.error("Erro geral no serviço de filmes:", error);
      return [];
    }
  },

  // 2. NOVO MÉTODO: Envia o filme do formulário direto para o seu Banco de Dados (db.json)
  async cadastrar(novoFilme) {
    try {
      // Faz um POST enviando os dados para a porta 3001 do json-server (Slide 07)
      const response = await axios.post(URL_BANCO_LOCAL, novoFilme);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar filme no db.json:", error);
      throw error;
    }
  }
};