import {
  Activity,
  CreditCard,
  FolderOpen,
  ShieldAlert,
} from "lucide-react";

import StatCard from "@/components/cards/stat-card";
import { DashboardStats } from "@/types/dashboard";

interface Props {
  stats: DashboardStats;
}

export default function StatsGrid({ stats }: Props) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Transactions"
        value={stats.totalTransactions}
        subtitle="Total monitored"
        icon={CreditCard}
      />

      <StatCard
        title="Confirmed Fraud"
        value={stats.confirmedFraud}
        subtitle="High Risk"
        icon={ShieldAlert}
        iconColor="text-red-500"
      />

      <StatCard
        title="Open Cases"
        value={stats.openCases}
        subtitle="Needs Review"
        icon={FolderOpen}
        iconColor="text-yellow-500"
      />

      <StatCard
        title="Safe Transactions"
        value={stats.safeTransactions}
        subtitle="Monitoring Active"
        icon={Activity}
        iconColor="text-green-500"
      />

    </section>
  );
}