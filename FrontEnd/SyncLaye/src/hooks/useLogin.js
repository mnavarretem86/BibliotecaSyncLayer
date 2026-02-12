import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import { notify } from "../utils/toast";

export function useLogin() {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {

    setLoading(true);
    try {

      const { data } = await login(email, password);

      notify.success(`¡Bienvenido, ${data.primerNombre}!`);

      sessionStorage.setItem("user", JSON.stringify(data));
      navigate("/");

    } catch {
      notify.error("Credenciales incorrectas.");

    } finally {
      setLoading(false);
    }
  };
  return { handleLogin, loading };
}
