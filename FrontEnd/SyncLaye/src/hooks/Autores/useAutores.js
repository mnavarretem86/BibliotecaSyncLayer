import { useState, useEffect, useCallback, useMemo } from "react";
import { getAutores } from "../../api/autor.api";
import { getEstados } from "../../api/estado.api"; 
import { notify } from "../../utils/toast";

export function useAutores() {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [resAutores, resEstados] = await Promise.all([getAutores(), getEstados()]);
      const dataEnriquecida = resAutores.data.map(autor => ({
        ...autor,
        nombreEstado: resEstados.data.find(e => e.estadoID === autor.estadoID)?.nombreEstado || "N/A"
      }));
      setAutores(dataEnriquecida);
    } catch (error) {
      notify.error("Error al sincronizar datos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filteredAutores = useMemo(() => {
    const term = search.toLowerCase();
    return autores.filter(a => 
      a.primerNombre?.toLowerCase().includes(term) || 
      a.primerApellido?.toLowerCase().includes(term) ||
      a.nacionalidad?.toLowerCase().includes(term)
    );
  }, [autores, search]);

  const totalPages = Math.ceil(filteredAutores.length / itemsPerPage);
  const paginatedAutores = filteredAutores.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  return { 
    autores: paginatedAutores, 
    loading, 
    refetch: fetchData,
    search,
    setSearch: (val) => { setSearch(val); setCurrentPage(1); },
    currentPage,
    setCurrentPage,
    totalPages
  };
}