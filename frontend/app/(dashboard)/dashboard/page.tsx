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
      <div className="text-lg">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <DashboardHero />

      <StatsGrid stats={data.stats} />

      <ChartsSection />

      <TransactionsSection
        transactions={data.recentTransactions}
      />

      <CasesSection
        cases={data.recentCases}
      />

    </div>
  );
}