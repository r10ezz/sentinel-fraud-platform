import api from "./api";

export interface StartSimulationDTO {
  type: "normal" | "mixed" | "attack";
  duration: number;
}

export async function startSimulation(
  data: StartSimulationDTO
) {
  const response = await api.post(
    "/simulation/start",
    data
  );

  return response.data;
}