import FraudPie from "@/components/charts/fraud-pie";
import RiskChart from "@/components/charts/risk-chart";

export default function ChartsSection() {
  return (
    <section className="grid gap-6 xl:grid-cols-3">

      <div className="xl:col-span-2">
        <RiskChart />
      </div>

      <FraudPie />

    </section>
  );
}