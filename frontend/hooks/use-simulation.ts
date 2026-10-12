"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  startSimulation,
  StartSimulationDTO,
} from "@/services/simulation";

export function useSimulation() {
  return useMutation({
    mutationFn: (data: StartSimulationDTO) =>
      startSimulation(data),

    onSuccess: () => {
      toast.success("Simulation Started");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "Failed to start simulation"
      );
    },
  });
}