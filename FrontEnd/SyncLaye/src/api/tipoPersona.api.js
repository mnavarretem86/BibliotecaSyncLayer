import httpClient from "./httpClient"

export const getTipoPersona = () => {
    return httpClient.get(`/TipoPersona`);
}