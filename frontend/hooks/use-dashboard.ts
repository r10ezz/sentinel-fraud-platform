"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/services/dashboard";
import { DashboardResponse } from "@/types/dashboard";

export function useDashboard() {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
}