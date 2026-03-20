import { useEffect, useState, useCallback, useMemo } from "react";
import { getPrestamos } from "../../api/prestamo.api";
import { notify } from "../../utils/toast";

export function usePrestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchPrestamos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPrestamos();
      setPrestamos(response.data || []);
    } catch {
      notify.error("Error al cargar préstamos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrestamos();
  }, [fetchPrestamos]);

  // Filtrado lógico
  const filteredPrestamos = useMemo(() => {
    const term = search.toLowerCase();
    return prestamos.filter(
      (p) =>
        p.titulo?.toLowerCase().includes(term) ||
        p.usuario?.toLowerCase().includes(term)
    );
  }, [prestamos, search]);

  // Paginación
  const totalPages = Math.ceil(filteredPrestamos.length / itemsPerPage);
  const paginatedPrestamos = filteredPrestamos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    prestamos: paginatedPrestamos,
    loading,
    refetch: fetchPrestamos,
    search,
    setSearch: (val) => { setSearch(val); setCurrentPage(1); },
    currentPage,
    setCurrentPage,
    totalPages,
  };
}