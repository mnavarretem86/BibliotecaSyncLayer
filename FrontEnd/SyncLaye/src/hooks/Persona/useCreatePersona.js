import { useState, useEffect } from "react";
import { createPersona } from "../../api/persona.api";
import { getTipoPersona } from "../../api/tipoPersona.api";
import { notify } from "../../utils/toast";

export function useCreatePersona(onRefresh, onClose) {
  const initialForm = {
    primerNombre: "", segundoNombre: "", primerApellido: "", segundoApellido: "",
    dni: "", genero: "", fechaNacimiento: "", email: "", telefono: "",
    direccion: "", tipoPersonaID: ""
  };

  const [formData, setFormData] = useState(initialForm);
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTipoPersona().then(res => setTipos(res.data)).catch(() => notify.error("Error al cargar tipos"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const savePersona = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPersona(formData);
      notify.success("Persona registrada con éxito");
      setFormData(initialForm);
      onRefresh();
      onClose();
    } catch (error) {
      notify.error("Error al guardar la persona");
    } finally {
      setLoading(false);
    }
  };

  return { formData, tipos, loading, handleChange, savePersona };
}