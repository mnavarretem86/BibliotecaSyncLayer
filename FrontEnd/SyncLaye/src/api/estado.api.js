import httpClient from "./httpClient"

export const getEstados = () => {
    return httpClient.get(`/Estado`);
}