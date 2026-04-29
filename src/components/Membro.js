import './cards.css'; // Importe o CSS também aqui

export default function Membro(props) {
  return (
    <div className="membro-card">
      <h4>{props.nome}</h4>
      <p>{props.cargo}</p>
    </div>
  );
}