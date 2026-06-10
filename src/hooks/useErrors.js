import { useState } from "react";

export function useErrors() {
  const [erros, setErros] = useState({});

  // Limpa o erro de um campo específico assim que o usuário digita
  const limparErroCampo = (nomeCampo) => {
    if (erros[nomeCampo]) {
      setErros((prev) => ({
        ...prev,
        [nomeCampo]: ""
      }));
    }
  };

  // Reseta todos os erros (útil antes de uma nova validação)
  const limparTodosErros = () => {
    setErros({});
  };

  return {
    erros,
    setErros,
    limparErroCampo,
    limparTodosErros
  };
}