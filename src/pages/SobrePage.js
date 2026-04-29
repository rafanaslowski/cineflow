import Membro from "../components/Membro";

export default function SobrePage() {
  return (
    <div className="container-sobre">
      <h2>Equipe CineFlow</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Membro nome="Rafael Naslowski" cargo="Aluno de BSI" />
        <Membro nome="Gabriel Donato" cargo="Aluno de BSI" />
        <Membro nome="Pedro Fagundes" cargo="Aluno de BSI" />
        <Membro nome="Matheus Gomes" cargo="Aluno de BSI" />
      </div>
    </div>
  );
}