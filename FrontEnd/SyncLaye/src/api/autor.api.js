import httpClient from "./httpClient";

export const getAutores = () => {
  return httpClient.get("/Autor");
};

export const getAutorById = (id) => {
  return httpClient.get(`/Autor/${id}`);
};

export const createAutor = (autorData) => {
  return httpClient.post("/Autor", autorData);
};

export const updateAutor = (id, autorData) => {
  return httpClient.put(`/Autor/${id}`, autorData);
};