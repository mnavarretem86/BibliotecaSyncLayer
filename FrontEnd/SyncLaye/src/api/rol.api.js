import httpClient from "./httpClient";

export const getRoles = () => {
  return httpClient.get("/Rol");
};

export const createRol = (rolData) => {
  return httpClient.post("/Rol", rolData);
};

export const updateRol = (id, rolData) => {
  return httpClient.put(`/Rol/${id}`, rolData);
};