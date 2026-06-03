import MovieCard from "../components/MovieCard";
import '../style.css';
import { useState, useEffect } from "react";
import { filmeService } from "../services/filmeService";

export default function FilmesPage() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const fetchFilmes = async () => {
      const dados = await filmeService.listarTodos();
      setFilmes(dados);
    };

    fetchFilmes();
  }, []);

  return (
    <div className="container"> 
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Nosso Catálogo</h2>
      </div>
      
      <div className="flex-grid">
        {/* ADICIONADO: Mapeamento dinâmico dos filmes vindos da API */}
        {filmes.map((filme, index) => (
          <MovieCard 
            key={index} 
            titulo={filme.titulo} 
            genero={filme.genero}  
            ano={filme.ano} 
            capa={filme.capa} 
          />
        ))}
      </div>
    </div>
  );
}