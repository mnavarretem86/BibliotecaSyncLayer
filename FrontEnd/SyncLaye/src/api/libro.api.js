import httpClient from "./httpClient";

export const getLibros = () => {
  return httpClient.get("/Libro");
};

export const getLibroById = (id) => {
  return httpClient.get(`/Libro/${id}`);
};

export const createLibro = (libroData) => {
  return httpClient.post("/Libro", libroData);
};

export const updateLibro = (id, libroData) => {
  return httpClient.put(`/Libro/${id}`, libroData);
};