import { create } from "zustand";

interface SimulationState {
  running: boolean;
  type: string;

  current: number;
  total: number;

  percent: number;

  start: (type: string, total: number) => void;

  progress: (
    current: number,
    total: number,
    percent: number
  ) => void;

  finish: () => void;
}

export const useSimulationStore =
  create<SimulationState>((set) => ({
    running: false,

    type: "",

    current: 0,

    total: 0,

    percent: 0,

    start: (type, total) =>
      set({
        running: true,
        type,
        total,
        current: 0,
        percent: 0,
      }),

    progress: (
      current,
      total,
      percent
    ) =>
      set({
        current,
        total,
        percent,
      }),

    finish: () =>
      set({
        running: false,
        current: 0,
        total: 0,
        percent: 100,
      }),
  }));