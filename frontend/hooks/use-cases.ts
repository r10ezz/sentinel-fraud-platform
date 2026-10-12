"use client";

import { useQuery } from "@tanstack/react-query";
import { getCases, CaseQuery } from "@/services/case";

export function useCases(query: CaseQuery) {
  return useQuery({
    queryKey: ["cases", query],
    queryFn: () => getCases(query),
    placeholderData: (previousData) => previousData,
  });
}