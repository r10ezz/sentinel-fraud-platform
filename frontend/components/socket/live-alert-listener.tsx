"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import { socket } from "@/lib/socket";

export default function LiveAlertListener() {
  useEffect(() => {
    const handler = (data: any) => {
      toast.error("🚨 High Risk Transaction", {
        description: `${data.merchant} • ₹${Number(data.amount).toLocaleString(
          "en-IN"
        )} • ${data.country} • Risk ${data.riskScore}`,
        duration: 6000,
      });
    };

    socket.on("fraud-alert", handler);

    return () => {
      socket.off("fraud-alert", handler);
    };
  }, []);

  return null;
}