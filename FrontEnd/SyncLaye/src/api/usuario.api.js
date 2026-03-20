import httpClient from "./httpClient";

export const getUsuarios = () => {
  return httpClient.get("/Usuario");
};

export const getUsuariosSinRol = () => {
  return httpClient.get("/Usuario/sin-rol");
};

export const createUsuario = (usuarioData) => {
  return httpClient.post("/Usuario", usuarioData);
};

export const updateUsuario = (id, usuarioData) => {
  return httpClient.put(`/Usuario/${id}`, usuarioData);
};