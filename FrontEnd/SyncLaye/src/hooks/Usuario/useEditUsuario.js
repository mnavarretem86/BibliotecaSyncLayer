import { useEffect, useState } from "react";
import { updateUsuario, getUsuarios } from "../../api/usuario.api";
import { getRoles } from "../../api/rol.api";
import { getEstados } from "../../api/estado.api";
import { notify } from "../../utils/toast";

export function useEditUsuario(usuarioId, onRefresh, onClose) {

  const [formData, setFormData] = useState({});
  const [roles, setRoles] = useState([]);
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const loadData = async () => {

      try {

        const [usuariosRes, rolesRes, estadosRes] = await Promise.all([
          getUsuarios(),
          getRoles(),
          getEstados()
        ]);

        const usuario = usuariosRes.data.find(u => u.usuarioID === usuarioId);

        if (!usuario) {
          notify.error("Usuario no encontrado");
          return;
        }

        setFormData({
          usuarioID: usuario.usuarioID,
          personaID: usuario.personaID,
          nombrePersona: usuario.nombrePersona,
          rolID: usuario.rolID,
          estadoID: usuario.estadoID,
          contrasena: ""
        });

        setRoles(rolesRes.data);

        setEstados(
          estadosRes.data.filter(x =>
            (x.TipoEstado || x.tipoEstado)?.toLowerCase() === "usuario"
          )
        );

      } catch (error) {

        notify.error(
          error?.response?.data?.mensaje ||
          error?.response?.data?.message ||
          error?.message ||
          "Error cargando datos del usuario"
        );

      }

    };

    if (usuarioId) loadData();

  }, [usuarioId]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const handleUpdate = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await updateUsuario(formData.usuarioID, formData);

      notify.success(
        response?.data?.mensaje ||
        response?.data?.message ||
        "Usuario actualizado correctamente"
      );

      onRefresh();
      onClose();

    } catch (error) {

      notify.error(
        error?.response?.data?.mensaje ||
        error?.response?.data?.message ||
        error?.message ||
        "Error actualizando usuario"
      );

    } finally {

      setLoading(false);

    }

  };

  return {
    formData,
    roles,
    estados,
    loading,
    handleChange,
    handleUpdate
  };

}