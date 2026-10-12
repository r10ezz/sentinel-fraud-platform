import { LucideIcon, TrendingUp } from "lucide-react";

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
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl">

      {/* Background Glow */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/5 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm font-medium text-zinc-400">
              {title}
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              {value}
            </h2>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-3 transition group-hover:scale-110">

            <Icon
              className={iconColor}
              size={24}
            />

          </div>

        </div>

        <div className="mt-6 flex items-center justify-between">

          <p className="text-sm text-zinc-500">
            {subtitle}
          </p>

          <div className="flex items-center gap-1 text-xs font-medium text-green-500">

            <TrendingUp size={14} />

            <span>Live</span>

          </div>

        </div>

      </div>

    </div>
  );
}