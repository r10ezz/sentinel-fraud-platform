import api from "./api";

export interface CaseQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  priority?: string;
  sort?: "asc" | "desc";
}

export async function getCases(params: CaseQuery) {
  const response = await api.get("/cases", {
    params: {
      ...params,
      status: params.status === "ALL" ? undefined : params.status,
      priority: params.priority === "ALL" ? undefined : params.priority,
    },
  });

  return response.data;
}

export async function assignCase(caseId: string, analystId: string) {
  const response = await api.patch(`/cases/${caseId}/assign`, { analystId });
  return response.data;
}

export async function resolveCase(caseId: string) {
  const response = await api.patch(`/cases/${caseId}/resolve`);
  return response.data;
}