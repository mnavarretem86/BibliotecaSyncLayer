import { useState, useEffect } from "react";
import { getAutores } from "../api/autor.api";
import { notify } from "../utils/toast";

export function useAutores() {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAutores = async () => {
    try {
      setLoading(true);
      const { data } = await getAutores();
      setAutores(data);
    } catch (error) {
      notify.error("Error al cargar autores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutores();
  }, []);

  return { autores, loading, refetch: fetchAutores };
}