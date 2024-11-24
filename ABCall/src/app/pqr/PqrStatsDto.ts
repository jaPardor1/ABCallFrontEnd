export interface PqrStatsDto {
  total_resolved: number; // Total de PQRs resueltas
  total_pending: number; // Total de PQRs pendientes
  total_escalated: number; // Total de PQRs escaladas
  average_resolution_time_per_month: { [key: string]: number }; // Tiempo promedio de resolución por mes (clave: mes, valor: días)
  closed_incidences_per_month: { [key: string]: number }; // Incidencias cerradas por mes (clave: mes, valor: cantidad)
  distribution: {
    CERRADO: number; // Cantidad de PQRs cerradas
    ABIERTO: number; // Cantidad de PQRs abiertas
    ESCALADO: number; // Cantidad de PQRs escaladas
  };
  incidences_per_channel: {
    WEB:number;
    APP:number;
  };
  resolution_times:number[];
}
