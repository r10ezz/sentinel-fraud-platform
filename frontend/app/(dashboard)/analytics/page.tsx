"use client";

import OverviewCards from "@/components/analytics/overview-cards";
import RiskChart from "@/components/analytics/risk-chart";
import CountryChart from "@/components/analytics/country-chart";
import MerchantChart from "@/components/analytics/merchant-chart";
import DailyChart from "@/components/analytics/daily-chart";

import { useAnalytics } from "@/hooks/use-analytics";

export default function AnalyticsPage() {
  const { data, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading Analytics...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Failed to load analytics.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <p className="mt-2 text-muted-foreground">
          Fraud monitoring insights and trends.
        </p>

      </div>

      <OverviewCards
        overview={data.overview}
      />

      <div className="grid gap-6 lg:grid-cols-2">

        <RiskChart
          data={data.riskDistribution}
        />

        <DailyChart
          data={data.dailyTransactions}
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <CountryChart
          data={data.topCountries}
        />

        <MerchantChart
          data={data.topMerchants}
        />

      </div>

    </div>
  );
}