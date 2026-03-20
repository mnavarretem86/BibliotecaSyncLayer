import httpClient from "./httpClient";

export const getPrestamos = () => {
  return httpClient.get("/Prestamo");
};

export const getPrestamoById = (id) => {
  return httpClient.get(`/Prestamo/${id}`);
};

export const createPrestamo = (prestamoData) => {
  return httpClient.post("/Prestamo", prestamoData);
};

export const devolverPrestamo = (data) => {
  return httpClient.put("/Prestamo/devolver", data);
};