"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTransaction,
  CreateTransactionDTO,
} from "@/services/transaction";
import { toast } from "sonner";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransactionDTO) =>
      createTransaction(data),

    onSuccess: () => {
      toast.success("Transaction created");

      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cases"],
      });

      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });

      queryClient.invalidateQueries({
        queryKey: ["audit-logs"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to create transaction"
      );
    },
  });
}