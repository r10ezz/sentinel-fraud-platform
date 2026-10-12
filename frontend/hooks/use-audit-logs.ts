"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getAuditLogs,
  AuditLogQuery,
} from "@/services/audit-log";

export function useAuditLogs(
  params: AuditLogQuery
) {
  return useQuery({
    queryKey: ["audit-logs", params],
    queryFn: () => getAuditLogs(params),
  });
}