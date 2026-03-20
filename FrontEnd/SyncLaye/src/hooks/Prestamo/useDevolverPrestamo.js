import { useState } from "react";
import { devolverPrestamo } from "../../api/prestamo.api";
import { notify } from "../../utils/toast";

export function useDevolverPrestamo(onRefresh, onClose) {
  const [loading, setLoading] = useState(false);

  const handleDevolver = async (prestamoId, observaciones) => {
    try {
      setLoading(true);

      await devolverPrestamo({
        PrestamoID: prestamoId,
        Observaciones: observaciones || ""
      });

      notify.success("Préstamo devuelto correctamente");

      if (onRefresh) onRefresh();
      if (onClose) onClose();

    } catch (error) {
      notify.error("Error al devolver préstamo");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { handleDevolver, loading };
}