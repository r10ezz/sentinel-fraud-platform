"use client";

import { useQuery } from "@tanstack/react-query";
import { getTransactions, TransactionQuery } from "@/services/transaction";

export function useTransactions(query: TransactionQuery) {
  return useQuery({
    queryKey: ["transactions", query],
    queryFn: () => getTransactions(query),
    placeholderData: (previousData) => previousData,
  });
}