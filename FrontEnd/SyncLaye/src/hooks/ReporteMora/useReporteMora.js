import { useEffect, useState, useCallback } from "react";
import { getReporteMora } from "../../api/reportemora.api";

export const useReporteMora = () => {
  const [moras, setMoras] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReporte = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getReporteMora();
      
      const data = response.data || response;

      const procesados = data.map((m) => ({
        ...m,
        fechaPrestamoFormateada: new Date(m.fechaPrestamo).toLocaleDateString(),
        fechaVencimientoFormateada: new Date(m.fechaVencimiento).toLocaleDateString(),
        montoFormateado: `C$${m.montoAdeudado?.toFixed(2)}`,
        claseMora: m.diasMora >= 15 
          ? "bg-red-200 text-red-700" 
          : "bg-orange-200 text-orange-700"
      }));

      setMoras(procesados);
    } catch (error) {
      console.error("Error cargando reporte de mora:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReporte();
  }, [fetchReporte]);

  return { moras, loading, refetch: fetchReporte };
};