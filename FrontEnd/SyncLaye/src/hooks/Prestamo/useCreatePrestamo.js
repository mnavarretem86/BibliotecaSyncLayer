import { useState, useEffect, useMemo } from "react";
import { createPrestamo } from "../../api/prestamo.api";
import { getLibros } from "../../api/libro.api";
import { getUsuarios } from "../../api/usuario.api";
import { getPersonas } from "../../api/persona.api";
import { notify } from "../../utils/toast";

export function useCreatePrestamo(onRefresh, onClose) {

  const [data, setData] = useState({ libros: [], usuarios: [] });

  const [form, setForm] = useState({
    libroID: "",
    usuarioID: "",
    qL: "",
    qU: ""
  });

  const [loading, setLoading] = useState(false);

  const cargarDatos = async () => {
    try {

      const [l, u, p] = await Promise.all([
        getLibros(),
        getUsuarios(),
        getPersonas()
      ]);

      const personasMap = Object.fromEntries(
        p.data.map(per => [per.personaID, per])
      );

      setData({
        libros: l.data,
        usuarios: u.data.map(user => {

          const persona = personasMap[user.personaID];

          return {
            ...user,
            name: persona
              ? `${persona.primerNombre} ${persona.primerApellido}`
              : ""
          };

        })
      });

    } catch (error) {
      notify.error(error.response?.data?.mensaje || error.response?.data);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [form.libroID === "" && form.usuarioID === ""]);

  const filter = (list, q, field) =>
    q.length > 1 && !list.some(i => i[field] === q)
      ? list
          .filter(i =>
            String(i[field]).toLowerCase().includes(q.toLowerCase())
          )
          .slice(0, 5)
      : [];

  const filtered = {
    libros: filter(data.libros, form.qL, "titulo"),
    usuarios: filter(data.usuarios, form.qU, "name")
  };

  const libroSel = useMemo(
    () => data.libros.find(l => l.libroID === form.libroID),
    [data.libros, form.libroID]
  );

  const save = async (e) => {

    e.preventDefault();

    if (!form.libroID || !form.usuarioID) return;

    try {

      setLoading(true);

      const res = await createPrestamo({
        libroID: form.libroID,
        usuarioID: form.usuarioID
      });

      notify.success(res.data?.mensaje || res.data);

      await onRefresh?.();

      onClose();

    } catch (err) {

      notify.error(err.response?.data?.mensaje || err.response?.data);

    } finally {

      setLoading(false);

    }

  };

  return {
    form,
    setForm,
    loading,
    save,
    data,
    filtered,
    libroSel
  };

}