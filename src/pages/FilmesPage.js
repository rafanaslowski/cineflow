import MovieCard from "../components/MovieCard";

export default function FilmesPage() {
  return (
    <div>
      <h2>🎥 Nosso Catálogo</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <MovieCard titulo="Interestelar" genero="Ficção" ano={2014} capa="https://via.placeholder.com/150x220" />
        <MovieCard titulo="Batman" genero="Ação" ano={2022} capa="https://via.placeholder.com/150x220" />
        <MovieCard titulo="O Menu" genero="Suspense" ano={2022} capa="https://via.placeholder.com/150x220" />
      </div>
    </div>
  );
}