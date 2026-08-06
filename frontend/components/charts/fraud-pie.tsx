"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Safe", value: 75 },
  { name: "Flagged", value: 15 },
  { name: "Fraud", value: 10 },
];

const COLORS = ["#22C55E", "#F59E0B", "#EF4444"];

export default function FraudPie() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h3 className="mb-6 text-lg font-semibold">Fraud Distribution</h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={90}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}