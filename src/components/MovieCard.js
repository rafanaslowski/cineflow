export default function MovieCard(props) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', borderRadius: '8px', width: '200px', textAlign: 'center' }}>
      <img src={props.capa} alt={props.titulo} style={{ width: '100%', borderRadius: '4px' }} />
      <h3>{props.titulo}</h3>
      <p><strong>{props.genero}</strong></p>
      <p>{props.ano}</p>
    </div>
  );
}