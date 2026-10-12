import {
  Activity,
  CreditCard,
  FolderOpen,
  ShieldAlert,
  AlertTriangle,
} from "lucide-react";

import StatCard from "@/components/cards/stat-card";
import { DashboardStats } from "@/types/dashboard";

interface Props {
  stats: DashboardStats;
}

export default function StatsGrid({ stats }: Props) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

      <StatCard
        title="Transactions"
        value={stats.totalTransactions}
        subtitle="Total monitored"
        icon={CreditCard}
        iconColor="text-blue-500"
      />

      <StatCard
        title="Safe"
        value={stats.safeTransactions}
        subtitle="Monitoring Active"
        icon={Activity}
        iconColor="text-green-500"
      />

      <StatCard
        title="Flagged"
        value={stats.flaggedTransactions}
        subtitle="Needs Review"
        icon={AlertTriangle}
        iconColor="text-yellow-500"
      />

      <StatCard
        title="Fraud"
        value={stats.confirmedFraud}
        subtitle="Confirmed Cases"
        icon={ShieldAlert}
        iconColor="text-red-500"
      />

      <StatCard
        title="Open Cases"
        value={stats.openCases}
        subtitle="Investigations"
        icon={FolderOpen}
        iconColor="text-orange-500"
      />

    </section>
  );
}