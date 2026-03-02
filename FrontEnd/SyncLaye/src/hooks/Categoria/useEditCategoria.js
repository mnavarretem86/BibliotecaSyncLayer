import { useState, useEffect } from "react";
import { updateCategoria } from "../../api/categoria.api";
import { notify } from "../../utils/toast";

export function useEditCategoria(categoria, isOpen, onRefresh, onClose) {

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!isOpen || !categoria) return;

    setFormData({
      categoriaID: categoria.categoriaID,
      nombreCategoria: categoria.nombreCategoria || ""
    });

  }, [categoria, isOpen]);

  const handleChange = (e) => {
    const { value } = e.target;

    setFormData(prev => ({
      ...prev,
      nombreCategoria: value
    }));
  };

  const updateCategoriaData = async (e) => {

    e.preventDefault();
    if (!formData) return;

    setLoading(true);

    try {

      await updateCategoria(formData.categoriaID, {
        nombreCategoria: formData.nombreCategoria
      });

      notify.success("Categoría actualizada correctamente");

      onRefresh?.();
      onClose?.();

    } catch (error) {

      notify.error("Error al actualizar categoría");

    } finally {

      setLoading(false);

    }
  };

  return {
    formData,
    loading,
    handleChange,
    updateCategoriaData
  };
}