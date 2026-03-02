import { useState, useEffect } from "react";
import { createLibro } from "../../api/libro.api";
import { getCategorias } from "../../api/categoria.api";
import { getEstados } from "../../api/estado.api";
import { notify } from "../../utils/toast";

export function useCreateLibro(onRefresh, onClose) {

  const initialForm = {
    titulo: "",
    isbn: "",
    anioPublicacion: "",
    categoriaID: "",
    estadoID: "",
    stockTotal: 0
  };

  const [formData, setFormData] = useState(initialForm);
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    async function loadData() {

      try {

        const [{ data: catData }, { data: estData }] = await Promise.all([
          getCategorias(),
          getEstados()
        ]);

        setCategorias(catData);
        setEstados(
          estData.filter(x =>
            (x.TipoEstado || x.tipoEstado)?.toLowerCase() === "libro"
          )
        );

      } catch {

        notify.error("Error al cargar datos auxiliares");

      }
    }

    loadData();

  }, []);

  const handleChange = ({ target: { name, value } }) => {

    setFormData(prev => ({
      ...prev,
      [name]:
        name === "categoriaID" ||
        name === "estadoID" ||
        name === "anioPublicacion" ||
        name === "stockTotal"
          ? Number(value) || ""
          : value
    }));

  };

  const saveLibro = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {

      await createLibro(formData);

      notify.success("Libro registrado con éxito");

      setFormData(initialForm);
      onRefresh?.();
      onClose?.();

    } catch {

      notify.error("Error al guardar libro");

    } finally {

      setLoading(false);

    }
  };
  return {
    formData,
    categorias,
    estados,
    loading,
    handleChange,
    saveLibro
  };
}