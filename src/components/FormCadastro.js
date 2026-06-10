import { useState } from "react";
import { filmeService } from "../services/filmeService";

export default function FormCadastro() {
  const [formData, setFormData] = useState({
    titulo: "",
    genero: "",
    ano: "",
    capa: ""
  });

  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    if (erros[name]) {
      setErros({
        ...erros,
        [name]: ""
      });
    }
  };

  const handleImagem = (e) => {
    const arquivo = e.target.files[0];

    if (!arquivo) return;

    const reader = new FileReader();

    reader.onloadend = () => {
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

    if (!validarFormulario()) {
      return;
    }

    try {
      await filmeService.cadastrar(formData);

      alert("Filme cadastrado com sucesso!");

      setFormData({
        titulo: "",
        genero: "",
        ano: "",
        capa: ""
      });

      document.querySelector('input[type="file"]').value = "";
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar o filme.");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        Cadastrar Novo Filme
      </h2>

      <form
        onSubmit={handleSubmit}
        className="form-cadastro"
        noValidate
      >
        <div style={{ width: "100%" }}>
          <input
            name="titulo"
            type="text"
            placeholder="Título do Filme"
            value={formData.titulo}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              boxSizing: "border-box"
            }}
          />

          {erros.titulo && (
            <span
              style={{
                color: "red",
                fontSize: "12px",
                display: "block",
                marginTop: "4px"
              }}
            >
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
            onChange={handleChange}
            required
            style={{
              width: "100%",
              boxSizing: "border-box"
            }}
          />

          {erros.genero && (
            <span
              style={{
                color: "red",
                fontSize: "12px",
                display: "block",
                marginTop: "4px"
              }}
            >
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
            onChange={handleChange}
            required
            style={{
              width: "100%",
              boxSizing: "border-box"
            }}
          />

          {erros.ano && (
            <span
              style={{
                color: "red",
                fontSize: "12px",
                display: "block",
                marginTop: "4px"
              }}
            >
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
            style={{
              width: "100%",
              boxSizing: "border-box"
            }}
          />

          {erros.capa && (
            <span
              style={{
                color: "red",
                fontSize: "12px",
                display: "block",
                marginTop: "4px"
              }}
            >
              {erros.capa}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="btn-submit"
          style={{ marginTop: "10px" }}
        >
          Cadastrar Filme
        </button>
      </form>

      <div
        style={{
          color: "gray",
          fontSize: "12px",
          textAlign: "center",
          marginTop: "10px"
        }}
      >
        Editando: {formData.titulo}
      </div>
    </div>
  );
}