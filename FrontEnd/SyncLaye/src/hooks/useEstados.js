import { useState, useEffect } from "react";
import { getEstados } from "../api/estado.api";
import { notify } from "../utils/toast";

export function useEstados() {
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const { data } = await getEstados();
        setEstados(data);
      } catch {
        notify.error("Error al cargar estados");
      }
    };

    fetchEstados();
  }, []);

  return { estados };
}
