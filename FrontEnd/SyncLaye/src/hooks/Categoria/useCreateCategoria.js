import { useState } from "react";
import { createCategoria } from "../../api/categoria.api";
import { notify } from "../../utils/toast";

export function useCreateCategoria(onRefresh, onClose) {
  const initialForm = { nombreCategoria: "" };

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ nombreCategoria: e.target.value });
  };

  const saveCategoria = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createCategoria(formData);
      notify.success("Categoría creada correctamente");
      setFormData(initialForm);
      onRefresh();
      onClose();
    } catch {
      notify.error("Error al crear categoría");
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, handleChange, saveCategoria };
}