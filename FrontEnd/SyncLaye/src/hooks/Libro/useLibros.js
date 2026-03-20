import { useState, useEffect, useCallback, useMemo } from "react";
import { getLibros } from "../../api/libro.api";
import { notify } from "../../utils/toast";

export function useLibros() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchLibros = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getLibros();
      setLibros(data);
    } catch (error) {
      notify.error("Error al sincronizar libros");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLibros(); }, [fetchLibros]);

  const filteredLibros = useMemo(() => {
    const term = search.toLowerCase();
    return libros.filter(l => 
      l.titulo.toLowerCase().includes(term) || l.isbn.toLowerCase().includes(term)
    );
  }, [libros, search]);

  const totalPages = Math.ceil(filteredLibros.length / itemsPerPage);
  const paginatedLibros = filteredLibros.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return { 
    libros: paginatedLibros, 
    loading, 
    refetch: fetchLibros, 
    search, 
    setSearch: (val) => { setSearch(val); setCurrentPage(1); }, 
    currentPage, 
    setCurrentPage, 
    totalPages 
  };
}