import api from "./api";

export interface AuditLogQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: "asc" | "desc";
}

export async function getAuditLogs(
  params: AuditLogQuery
) {
  const response = await api.get("/audit-logs", {
    params,
  });

  return response.data;
}