import { useState, useEffect, useCallback } from "react";
import { getLibros } from "../../api/libro.api";
import { notify } from "../../utils/toast";

export function useLibros() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchLibros();
  }, [fetchLibros]);

  return { libros, loading, refetch: fetchLibros };
}