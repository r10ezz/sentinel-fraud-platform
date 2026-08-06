import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  iconColor?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-blue-500",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-700">
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-400">{title}</span>

        <Icon className={iconColor} size={22} />
      </div>

      <h2 className="mt-5 text-4xl font-bold">{value}</h2>

      <p className="mt-2 text-sm text-zinc-500">{subtitle}</p>
    </div>
  );
}