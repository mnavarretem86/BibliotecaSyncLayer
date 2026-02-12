import { useState, useEffect, useCallback } from "react";
import { getPersonas } from "../../api/persona.api";
import { getTipoPersona } from "../../api/tipoPersona.api";
import { notify } from "../../utils/toast";

export function usePersonas() {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPersonas = useCallback(async () => {
    try {
      setLoading(true);

      const [{ data: personasData }, { data: tiposData }] = await Promise.all([
        getPersonas(),
        getTipoPersona()
      ]);
      const personasConTipo = personasData.map(p => {
        const tipo = tiposData.find(
          t => t.tipoPersonaID === p.tipoPersonaID
        );
        return {
          ...p,
          nombreTipo: tipo?.nombreTipo || "Sin asignar"
        };
      });
      setPersonas(personasConTipo);
    } catch (error) {
      notify.error("Error al sincronizar datos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPersonas();
  }, [fetchPersonas]);

  return { personas, loading, refetch: fetchPersonas };
}