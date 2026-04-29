import Membro from "../components/Membro";

export default function SobrePage() {
  return (
    <div>
      <h2>👥 Equipe CineFlow</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Membro nome="Rafael Luis" cargo="Líder de Projeto / Dev" />
        <Membro nome="Gabriel Donato" cargo="Frontend Dev" />
        <Membro nome="Pedro Fagundes" cargo="Frontend Dev" />
      </div>
    </div>
  );
}