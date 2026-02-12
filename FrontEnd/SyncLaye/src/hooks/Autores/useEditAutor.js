import { useState, useEffect } from "react";
import { getAutorById, updateAutor } from "../../api/autor.api";
import { getEstados } from "../../api/estado.api";
import { notify } from "../../utils/toast";

export function useEditAutor(autorId, onRefresh, onClose) {
  const [loading, setLoading] = useState(false);
  const [estados, setEstados] = useState([]);
  const [formData, setFormData] = useState({
    primerNombre: "",
    primerApellido: "",
    segundoApellido: "",
    nacionalidad: "",
    estadoID: null
  });

  useEffect(() => {
    if (!autorId) return;

    setLoading(true);

    Promise.all([getAutorById(autorId), getEstados()])
      .then(([a, e]) => {
        setFormData(a.data);
        setEstados(e.data.filter(x => x.tipoEstado === "Autor"));
      })
      .catch(() => {
        notify.error("Error al cargar autor");
        onClose();
      })
      .finally(() => setLoading(false));

  }, [autorId]);

  const handleChange = ({ target: { name, value } }) =>
    setFormData(prev => ({
      ...prev,
      [name]: name === "estadoID" ? Number(value) || null : value
    }));

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateAutor(autorId, formData);
      notify.success("Autor actualizado");
      onRefresh();
      onClose();
    } catch {
      notify.error("Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  return { formData, estados, loading, handleChange, handleUpdate };
}