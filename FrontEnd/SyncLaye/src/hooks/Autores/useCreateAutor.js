import { useState, useEffect } from "react";
import { createAutor } from "../../api/autor.api";
import { getEstados } from "../../api/estado.api";
import { notify } from "../../utils/toast";

export function useCreateAutor(onRefresh, onClose) {
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
    getEstados()
      .then(({ data }) =>
        setEstados(data.filter(e => e.tipoEstado === "Autor"))
      )
      .catch(() => notify.error("Error al cargar estados"));
  }, []);

  const handleChange = ({ target: { name, value } }) =>
    setFormData(prev => ({
      ...prev,
      [name]: name === "estadoID" ? Number(value) || null : value
    }));

  const saveAutor = async (e) => {
    e.preventDefault();
    if (!formData.primerNombre || !formData.primerApellido || !formData.estadoID)
      return notify.error("Complete los campos obligatorios");

    try {
      setLoading(true);
      await createAutor(formData);
      notify.success("Autor registrado con éxito");
      onRefresh();
      onClose();
    } catch {
      notify.error("Error al registrar el autor");
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, estados, handleChange, saveAutor };
}
