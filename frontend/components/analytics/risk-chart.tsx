"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  data: {
    low: number;
    medium: number;
    high: number;
  };
}

export default function RiskChart({ data }: Props) {
  const chartData = [
    {
      name: "Low",
      value: data.low,
      color: "#22c55e",
    },
    {
      name: "Medium",
      value: data.medium,
      color: "#f59e0b",
    },
    {
      name: "High",
      value: data.high,
      color: "#ef4444",
    },
  ];

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-6 text-lg font-semibold">
        Risk Distribution
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}