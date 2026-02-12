import httpClient from "./httpClient";

export const getPersonas = () => {
  return httpClient.get("/Personas");
};

export const getPersonaById = (id) => {
  return httpClient.get(`/Personas/${id}`);
};

export const createPersona = (personaData) => {
  return httpClient.post("/Personas", personaData);
};

export const updatePersona = (id, personaData) => {
  return httpClient.put(`/Personas/${id}`, personaData);
};