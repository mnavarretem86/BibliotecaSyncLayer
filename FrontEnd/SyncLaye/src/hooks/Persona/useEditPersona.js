import { useState, useEffect } from "react";
import { getPersonaById, updatePersona } from "../../api/persona.api";
import { getTipoPersona } from "../../api/tipoPersona.api";
import { notify } from "../../utils/toast";

export function useEditPersona(personaId, onRefresh, onClose) {
  const [loading, setLoading] = useState(false);
  const [tipos, setTipos] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!personaId) return;

    (async () => {
      setLoading(true);
      try {
        const [{ data: cats }, { data: p }] = await Promise.all([
          getTipoPersona(),
          getPersonaById(personaId)
        ]);
        
        setTipos(cats);
        setFormData({ ...p, fechaNacimiento: p.fechaNacimiento?.split('T')[0] || "" });
      } catch {
        notify.error("Error al sincronizar datos");
        onClose();
      } finally {
        setLoading(false);
      }
    })();
  }, [personaId]); 

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePersona(personaId, formData);
      notify.success("Datos actualizados");
      onRefresh();
      onClose();
    } catch {
      notify.error("Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  return { formData, tipos, loading, handleChange, handleUpdate };
}