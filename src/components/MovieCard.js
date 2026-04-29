import './cards.css';

export default function MovieCard(props) {
  return (
    <div className="movie-card">
      <img src={props.capa} alt={props.titulo} />
      <h3>{props.titulo}</h3>
      <p><strong>{props.genero}</strong></p>
      <p>{props.ano}</p>
    </div>
  );
}