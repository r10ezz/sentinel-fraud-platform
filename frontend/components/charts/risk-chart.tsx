"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const data = [
  { day: "Mon", risk: 12 },
  { day: "Tue", risk: 20 },
  { day: "Wed", risk: 15 },
  { day: "Thu", risk: 32 },
  { day: "Fri", risk: 28 },
  { day: "Sat", risk: 18 },
  { day: "Sun", risk: 10 },
];

export default function RiskChart() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <h3 className="mb-6 text-lg font-semibold">Risk Trend</h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid stroke="#27272A" />
            <XAxis dataKey="day" stroke="#71717A" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="risk"
              stroke="#2563EB"
              fill="#2563EB"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}