import { useState } from "react";

export function useFeedback() {
  const [feedback, setFeedback] = useState({ texto: "", tipo: "" });

  const mostrarFeedback = (texto, tipo) => {
    setFeedback({ texto, tipo });
    
    // Apaga o aviso automaticamente após 4 segundos
    setTimeout(() => {
      setFeedback({ texto: "", tipo: "" });
    }, 4000);
  };

  const limparFeedback = () => {
    setFeedback({ texto: "", tipo: "" });
  };

  return {
    feedback,
    mostrarFeedback,
    limparFeedback
  };
}