export default function Membro(props) {
  return (
    <div style={{ border: '1px solid #eee', padding: '15px', margin: '10px', borderRadius: '50px 10px', width: '180px', textAlign: 'center', backgroundColor: '#f4f4f4' }}>
      <h4>{props.nome}</h4>
      <p style={{ color: '#555' }}>{props.cargo}</p>
    </div>
  );
}