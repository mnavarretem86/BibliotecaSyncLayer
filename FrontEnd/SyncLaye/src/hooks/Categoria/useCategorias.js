import { useState, useEffect, useCallback } from "react";
import { getCategorias } from "../../api/categoria.api";
import { notify } from "../../utils/toast";

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategorias = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getCategorias();
      setCategorias(data);
    } catch {
      notify.error("Error al cargar categorías");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  return { categorias, loading, refetch: fetchCategorias };
}