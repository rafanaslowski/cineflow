import MovieCard from "../components/MovieCard";
import '../style.css';

export default function FilmesPage() {
  return (
    <div className="container"> 
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Nosso Catálogo</h2>
      </div>
      <div className="flex-grid">

        <MovieCard titulo="Vingadores: Ultimato" 
          genero="Ação/Ficção científica"  
          ano={2019} 
          capa="https://img.elo7.com.br/product/zoom/259A7AA/big-poster-filme-vingadores-ultimato-lo001-tamanho-90x60-cm-poster-marvel.jpg" />
       
        <MovieCard titulo="Gente Grande"
          genero="Comédia/Drama" 
          ano={2010} 
          capa="https://br.web.img3.acsta.net/r_1920_1080/medias/nmedia/18/73/45/19/19458195.jpg" />
        
        <MovieCard titulo="Michael" 
          genero="Musical/Drama Musical" 
          ano={2026} 
          capa="https://br.web.img3.acsta.net/c_310_420/img/e9/f1/e9f1efa99c6af0bbe48871b6d0a299f9.jpg" />
      
      </div>
    </div>
  );
}