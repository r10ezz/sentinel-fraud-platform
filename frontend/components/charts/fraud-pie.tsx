"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { DashboardStats } from "@/types/dashboard";

interface Props {
  stats?: DashboardStats;
}

const COLORS = ["#22C55E", "#F59E0B", "#EF4444"];

export default function FraudPie({ stats }: Props) {
  const safe = stats?.safeTransactions ?? 0;
  const flagged = stats?.flaggedTransactions ?? 0;
  const fraud = stats?.confirmedFraud ?? 0;
  const total = safe + flagged + fraud;

  const data = [
    { name: "Safe", value: safe },
    { name: "Flagged", value: flagged },
    { name: "Confirmed Fraud", value: fraud },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">Fraud Distribution</h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400">
            {total} Total
          </span>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Breakdown of evaluated transactions by risk classification.
        </p>
      </div>

      <div className="h-64">
        {total === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            No transactions evaluated yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#09090b",
                  borderColor: "#27272a",
                  borderRadius: "0.75rem",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}