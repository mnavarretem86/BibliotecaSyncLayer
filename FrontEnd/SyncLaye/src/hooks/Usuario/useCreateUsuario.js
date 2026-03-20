import { useEffect, useState } from "react";
import { createUsuario } from "../../api/usuario.api";
import { getPersonas } from "../../api/persona.api";
import { getRoles } from "../../api/rol.api";
import { notify } from "../../utils/toast";

export function useCreateUsuario(onRefresh, onClose) {

  const [formData, setFormData] = useState({
    personaID: "",
    rolID: "",
    contrasena: "",
    confirmarContrasena: ""
  });

  const [personas, setPersonas] = useState([]);
  const [roles, setRoles] = useState([]);

  const [searchPersona, setSearchPersona] = useState("");
  const [showPersonas, setShowPersonas] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const loadData = async () => {

      try {

        const [personasRes, rolesRes] = await Promise.all([
          getPersonas(),
          getRoles()
        ]);

        setPersonas(personasRes.data);
        setRoles(rolesRes.data);

      } catch (error) {
        notify.error("Error cargando datos iniciales");
      }

    };

    loadData();

  }, []);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const handleSelectPersona = (persona) => {

    setFormData(prev => ({
      ...prev,
      personaID: persona.personaID
    }));

    setSearchPersona(`${persona.primerNombre} ${persona.primerApellido}`);

    setShowPersonas(false);

  };

  const handleCreate = async (e) => {

    e.preventDefault();

    if (formData.contrasena !== formData.confirmarContrasena) {
      notify.warning("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {

      const response = await createUsuario({
        ...formData,
        estadoID: 1
      });

      notify.success(response?.data?.mensaje || "Usuario creado correctamente");

      setFormData({
        personaID: "",
        rolID: "",
        contrasena: "",
        confirmarContrasena: ""
      });

      setSearchPersona("");

      onRefresh();
      onClose();

    } catch (error) {

      notify.error(
        error?.response?.data?.mensaje ||
        "Error creando usuario"
      );

    }

    setLoading(false);

  };

  const personasFiltradas = personas
    .filter(p =>
      (`${p.primerNombre} ${p.primerApellido}`)
        .toLowerCase()
        .includes(searchPersona.toLowerCase())
    )
    .slice(0, 10);

  return {
    formData,
    personas: personasFiltradas,
    roles,
    searchPersona,
    setSearchPersona,
    showPersonas,
    setShowPersonas,
    loading,
    handleChange,
    handleSelectPersona,
    handleCreate
  };

}