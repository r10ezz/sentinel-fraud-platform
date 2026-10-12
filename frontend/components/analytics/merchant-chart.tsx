"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    merchant: string;
    count: number;
  }[];
}

export default function MerchantChart({
  data,
}: Props) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="mb-6 text-lg font-semibold">
        Top Fraud Merchants
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="merchant" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}