//useEditLibro.js
import { useState, useEffect } from "react";
import { getLibroById, updateLibro } from "../../api/libro.api";
import { getCategorias } from "../../api/categoria.api";
import { getEstados } from "../../api/estado.api";
import { notify } from "../../utils/toast";

export function useEditLibro(libroId, isOpen, onRefresh, onClose) {

  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);
  const [formData, setFormData] = useState(null);

  useEffect(() => {

    if (!libroId || !isOpen) return;

    setLoading(true);

    Promise.all([
      getLibroById(libroId),
      getCategorias(),
      getEstados()
    ])
      .then(([libroRes, categoriasRes, estadosRes]) => {

        const libro = libroRes.data;

        setFormData({
          titulo: libro.titulo || "",
          isbn: libro.isbn || "",
          anioPublicacion: libro.anioPublicacion || "",
          categoriaID: libro.categoriaID || "",
          estadoID: libro.estadoID || "",
          stockTotal: libro.stockTotal || ""
        });

        setCategorias(categoriasRes.data);

        setEstados(
          estadosRes.data.filter(x =>
            (x.TipoEstado || x.tipoEstado)?.toLowerCase() === "libro"
          )
        );

      })
      .catch(() => {
        notify.error("Error al cargar datos del libro");
        onClose?.();
      })
      .finally(() => setLoading(false));

  }, [libroId, isOpen]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({
      ...prev,
      [name]:
        name === "categoriaID" ||
        name === "estadoID" ||
        name === "anioPublicacion" ||
        name === "stockTotal"
          ? Number(value) || ""
          : value
    }));
  };

  const updateLibroData = async (e) => {

    e.preventDefault();
    if (!formData) return;

    try {

      setLoading(true);

      await updateLibro(libroId, formData);

      notify.success("Libro actualizado correctamente");

      onRefresh?.();
      onClose?.();

    } catch {

      notify.error("Error al actualizar libro");

    } finally {

      setLoading(false);

    }
  };

  return {
    formData,
    categorias,
    estados,
    loading,
    handleChange,
    updateLibroData
  };
}