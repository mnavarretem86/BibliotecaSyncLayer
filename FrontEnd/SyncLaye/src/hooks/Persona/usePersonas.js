import { useState, useEffect, useCallback, useMemo } from "react";
import { getPersonas } from "../../api/persona.api";
import { getTipoPersona } from "../../api/tipoPersona.api";
import { notify } from "../../utils/toast";

export function usePersonas() {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchPersonas = useCallback(async () => {
    try {
      setLoading(true);
      const [{ data: personasData }, { data: tiposData }] = await Promise.all([
        getPersonas(),
        getTipoPersona()
      ]);
      
      const personasConTipo = personasData.map(p => ({
        ...p,
        nombreTipo: tiposData.find(t => t.tipoPersonaID === p.tipoPersonaID)?.nombreTipo || "Sin asignar"
      }));
      
      setPersonas(personasConTipo);
    } catch (error) {
      notify.error("Error al sincronizar datos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPersonas(); }, [fetchPersonas]);

  const filteredPersonas = useMemo(() => {
    const term = search.toLowerCase();
    return personas.filter(p => 
      p.dni.toLowerCase().includes(term) || 
      p.primerNombre.toLowerCase().includes(term) || 
      p.primerApellido.toLowerCase().includes(term)
    );
  }, [personas, search]);

  const totalPages = Math.ceil(filteredPersonas.length / itemsPerPage);
  const paginatedPersonas = filteredPersonas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return { 
    personas: paginatedPersonas, 
    loading, 
    refetch: fetchPersonas,
    search,
    setSearch: (val) => { setSearch(val); setCurrentPage(1); },
    currentPage,
    setCurrentPage,
    totalPages
  };
}