import { useState } from "react";
import { filmeService } from "../services/filmeService";
import { useFeedback } from "../hooks/useFeedback"; 
// 1. Importar o seu novo hook useForm
import { useForm } from "../hooks/useForm"; 

export default function FormCadastro() {
  // 2. Inicializar o useForm com os campos vazios
  const { formData, setFormData, handleChange, resetForm } = useForm({
    titulo: "",
    genero: "",
    ano: "",
    capa: ""
  });

  const [erros, setErros] = useState({});
  const { feedback, mostrarFeedback, limparFeedback } = useFeedback();

  // 💡 A função handleChange antiga FOI APAGADA daqui porque o useForm já faz isso!

  const handleImagem = (e) => {
    const arquivo = e.target.files[0];

    if (!arquivo) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      // Usamos o setFormData do hook para atualizar a string da imagem em Base64
      setFormData((prev) => ({
        ...prev,
        capa: reader.result
      }));
    };

    reader.readAsDataURL(arquivo);
  };

  const validarFormulario = () => {
    const errosValidacao = {};
    const anoAtual = new Date().getFullYear();

    if (!formData.titulo.trim()) {
      errosValidacao.titulo = "O título é obrigatório.";
    }

    if (!formData.genero.trim()) {
      errosValidacao.genero = "O gênero é obrigatório.";
    }

    if (!formData.ano) {
      errosValidacao.ano = "O ano é obrigatório.";
    } else if (formData.ano < 1888 || formData.ano > anoAtual + 5) {
      errosValidacao.ano = `O ano deve ser entre 1888 e ${anoAtual + 5}.`;
    }

    if (!formData.capa) {
      errosValidacao.capa = "Selecione uma imagem.";
    }

    setErros(errosValidacao);

    return Object.keys(errosValidacao).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    limparFeedback();

    if (!validarFormulario()) {
      return;
    }

    try {
      await filmeService.cadastrar(formData);

      mostrarFeedback("Filme cadastrado com sucesso!", "sucesso");

      // 3. Usar a função resetForm do hook para limpar os campos de texto
      resetForm();

      document.querySelector('input[type="file"]').value = "";
    } catch (error) {
      console.error(error);
      mostrarFeedback("Erro ao salvar o filme.", "erro");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        Cadastrar Novo Filme
      </h2>

      <form onSubmit={handleSubmit} className="form-cadastro" noValidate>
        {feedback.texto && (
          <div className={`alerta-container alerta-${feedback.tipo}`}>
            {feedback.texto}
          </div>
        )}

        <div style={{ width: "100%" }}>
          <input
            name="titulo"
            type="text"
            placeholder="Título do Filme"
            value={formData.titulo}
            onChange={handleChange} // Continua funcionando igual!
            required
            style={{ width: "100%", boxSizing: "border-box" }}
          />
          {erros.titulo && (
            <span style={{ color: "red", fontSize: "12px", display: "block", marginTop: "4px" }}>
              {erros.titulo}
            </span>
          )}
        </div>

        <div style={{ width: "100%" }}>
          <input
            name="genero"
            type="text"
            placeholder="Gênero"
            value={formData.genero}
            onChange={handleChange} // Continua funcionando igual!
            required
            style={{ width: "100%", boxSizing: "border-box" }}
          />
          {erros.genero && (
            <span style={{ color: "red", fontSize: "12px", display: "block", marginTop: "4px" }}>
              {erros.genero}
            </span>
          )}
        </div>

        <div style={{ width: "100%" }}>
          <input
            name="ano"
            type="number"
            placeholder="Ano de Lançamento"
            value={formData.ano}
            onChange={handleChange} // Continua funcionando igual!
            required
            style={{ width: "100%", boxSizing: "border-box" }}
          />
          {erros.ano && (
            <span style={{ color: "red", fontSize: "12px", display: "block", marginTop: "4px" }}>
              {erros.ano}
            </span>
          )}
        </div>

        <div style={{ width: "100%" }}>
          <input
            name="capa"
            type="file"
            accept="image/*"
            onChange={handleImagem}
            required
            style={{ width: "100%", boxSizing: "border-box" }}
          />
          {erros.capa && (
            <span style={{ color: "red", fontSize: "12px", display: "block", marginTop: "4px" }}>
              {erros.capa}
            </span>
          )}
        </div>

        <button type="submit" className="btn-submit" style={{ marginTop: "10px" }}>
          Cadastrar Filme
        </button>
      </form>
    </div>
  );
}