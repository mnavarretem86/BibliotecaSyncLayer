import httpClient from "./httpClient";

export const getCategorias = () => {
  return httpClient.get("/Categoria");
};

export const createCategoria = (categoriaData) => {
  return httpClient.post("/Categoria", categoriaData);
};

export const updateCategoria = (id, categoriaData) => {
  return httpClient.put(`/Categoria/${id}`, categoriaData);
};