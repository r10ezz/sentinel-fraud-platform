"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { socket } from "@/lib/socket";

export default function useLiveUpdates() {
  const queryClient = useQueryClient();

  useEffect(() => {
    function onTransactionCreated() {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      queryClient.invalidateQueries({ queryKey: ["audit-logs"] });
    }

    function onFraudAlert() {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    }

    socket.on("transaction-created", onTransactionCreated);
    socket.on("fraud-alert", onFraudAlert);

    return () => {
      socket.off("transaction-created", onTransactionCreated);
      socket.off("fraud-alert", onFraudAlert);
    };
  }, [queryClient]);
}
