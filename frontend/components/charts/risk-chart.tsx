"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAnalytics } from "@/hooks/use-analytics";

export default function RiskChart() {
  const { data: analytics } = useAnalytics();

  const chartData =
    analytics?.dailyTransactions && analytics.dailyTransactions.length > 0
      ? analytics.dailyTransactions.map((d: any) => ({
          day: d.date.slice(5),
          transactions: d.count,
        }))
      : [
          { day: "Day 1", transactions: 3 },
          { day: "Day 2", transactions: 7 },
          { day: "Day 3", transactions: 12 },
          { day: "Day 4", transactions: 18 },
          { day: "Today", transactions: 24 },
        ];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Transaction & Risk Activity</h3>
          <p className="text-xs text-muted-foreground">
            Volume timeline across monitored payment rails.
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400">
          Live Streamed
        </span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#27272A" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" stroke="#71717A" fontSize={12} tickLine={false} />
            <YAxis stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#09090b",
                borderColor: "#27272a",
                borderRadius: "0.75rem",
                color: "#fff",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="transactions"
              stroke="#2563EB"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRisk)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}