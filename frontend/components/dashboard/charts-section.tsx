import FraudPie from "@/components/charts/fraud-pie";
import RiskChart from "@/components/charts/risk-chart";
import { DashboardStats } from "@/types/dashboard";

interface Props {
  stats?: DashboardStats;
}

export default function ChartsSection({ stats }: Props) {
  return (
    <section className="grid gap-6 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <RiskChart />
      </div>

      <FraudPie stats={stats} />
    </section>
  );
}