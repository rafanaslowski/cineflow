import { useState } from "react";

export function useForm(valoresIniciais) {
  const [formData, setFormData] = useState(valoresIniciais);

  // Função universal para atualizar qualquer input
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Função para resetar o formulário quando precisar
  const resetForm = () => {
    setFormData(valoresIniciais);
  };

  // Retornamos o estado e as funções para o componente usar
  return {
    formData,
    setFormData, // Útil para quando precisamos injetar dados manualmente (como a imagem ou o ViaCEP)
    handleChange,
    resetForm
  };
}