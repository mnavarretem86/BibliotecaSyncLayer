import httpClient from "./httpClient";

export const getReporteMora = async () => {
  try {
    const response = await httpClient.get("/ReporteMora");
    return response.data;
  } catch (error) {
    console.error("Error al obtener reporte de mora:", error);
    throw error;
  }
};