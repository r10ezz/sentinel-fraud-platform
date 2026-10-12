"use client";

import { useEffect, useState } from "react";

import { socket } from "@/lib/socket";
import { useSimulation } from "@/hooks/use-simulation";
import { useSimulationStore } from "@/store/simulation-store";
import { useAuthStore } from "@/store/auth-store";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
  Play,
  ShieldAlert,
  Loader2,
  Lock,
} from "lucide-react";

export default function SimulationCard() {
  const mutation = useSimulation();
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === "ADMIN";

  const {
    running,
    current,
    total,
    percent,
    start,
    progress,
    finish,
  } = useSimulationStore();

  const [mode, setMode] = useState<
    "normal" | "mixed" | "attack"
  >("attack");

  const [duration, setDuration] = useState("30");

  useEffect(() => {
    function onStarted(data: { type: string; totalEvents: number }) {
      start(data.type, data.totalEvents);
    }

    function onProgress(data: {
      current: number;
      total: number;
      percent: number;
    }) {
      progress(data.current, data.total, data.percent);
    }

    function onFinished() {
      finish();
    }

    socket.on("simulation-started", onStarted);
    socket.on("simulation-progress", onProgress);
    socket.on("simulation-finished", onFinished);

    return () => {
      socket.off("simulation-started", onStarted);
      socket.off("simulation-progress", onProgress);
      socket.off("simulation-finished", onFinished);
    };
  }, [start, progress, finish]);

  async function runSimulation() {
    if (!isAdmin) return;
    await mutation.mutateAsync({
      type: mode,
      duration: Number(duration),
    });
  }

  return (
    <Card className="border-zinc-800 bg-zinc-950/70">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <ShieldAlert className="text-red-500" />
          Simulation Engine
        </CardTitle>

        <CardDescription>
          Simulate realistic banking traffic and observe live fraud detection.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <p className="mb-2 text-sm font-medium text-zinc-300">
            Simulation Mode
          </p>

          <Select
            value={mode}
            onValueChange={(v) => {
              if (v) setMode(v as "normal" | "mixed" | "attack");
            }}
          >
            <SelectTrigger className="border-zinc-800 bg-zinc-900 text-white">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="border-zinc-800 bg-zinc-900 text-white">
              <SelectItem value="normal">
                🟢 Normal Banking
              </SelectItem>
              <SelectItem value="mixed">
                🟡 Mixed Traffic
              </SelectItem>
              <SelectItem value="attack">
                🔴 Fraud Attack
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-zinc-300">
            Duration
          </p>

          <Select
            value={duration}
            onValueChange={(value) => {
              if (value) {
                setDuration(value);
              }
            }}
          >
            <SelectTrigger className="border-zinc-800 bg-zinc-900 text-white">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="border-zinc-800 bg-zinc-900 text-white">
              <SelectItem value="15">
                15 Seconds
              </SelectItem>
              <SelectItem value="30">
                30 Seconds
              </SelectItem>
              <SelectItem value="60">
                60 Seconds
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {running && (
          <div className="space-y-3">
            <Progress value={percent} />

            <div className="flex justify-between text-sm text-zinc-400">
              <span>
                {current} / {total} Events
              </span>
              <span className="font-semibold text-blue-400">
                {percent}%
              </span>
            </div>
          </div>
        )}

        <Button
          className="w-full bg-blue-600 font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
          disabled={mutation.isPending || running || !isAdmin}
          onClick={runSimulation}
        >
          {mutation.isPending || running ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running Stream...
            </>
          ) : !isAdmin ? (
            <>
              <Lock className="mr-2 h-4 w-4 text-zinc-400" />
              Admin Role Required
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Run Simulation
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
