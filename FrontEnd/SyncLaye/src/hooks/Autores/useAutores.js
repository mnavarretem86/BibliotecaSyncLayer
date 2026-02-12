import { useState, useEffect } from "react";
import { getAutores } from "../../api/autor.api";
import { getEstados } from "../../api/estado.api"; 
import { notify } from "../../utils/toast";

export function useAutores() {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
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
  };
  useEffect(() => { fetchData(); }, []);
  return { autores, loading, refetch: fetchData };
}