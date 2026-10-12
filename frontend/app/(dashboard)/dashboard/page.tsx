"use client";

import DashboardHero from "@/components/dashboard/dashboard-hero";
import StatsGrid from "@/components/dashboard/stats-grid";
import ChartsSection from "@/components/dashboard/charts-section";
import TransactionsSection from "@/components/dashboard/transactions-section";
import CasesSection from "@/components/dashboard/cases-section";

import { useDashboard } from "@/hooks/use-dashboard";

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-zinc-400">
        Loading Sentinel Dashboard...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-red-400">
        Failed to load dashboard telemetry.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHero />

      <StatsGrid stats={data.stats} />

      <ChartsSection stats={data.stats} />

      <TransactionsSection transactions={data.recentTransactions} />

      <CasesSection cases={data.recentCases} />
    </div>
  );
}