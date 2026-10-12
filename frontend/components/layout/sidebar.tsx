"use client";

import {
  LayoutDashboard,
  CreditCard,
  ShieldAlert,
  BarChart3,
  Settings,
  ScrollText,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: CreditCard,
  },
  {
    title: "Cases",
    href: "/cases",
    icon: ShieldAlert,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Audit Logs",
    href: "/audit-logs",
    icon: ScrollText,
    minRole: ["ADMIN", "ANALYST"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  const role = user?.role || "VIEWER";
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  const roleColor =
    role === "ADMIN"
      ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
      : role === "ANALYST"
      ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
      : "bg-zinc-800 text-zinc-300 border-zinc-700";

  return (
    <aside className="flex w-72 flex-col justify-between border-r border-zinc-800 bg-zinc-950">
      <div>
        <div className="border-b border-zinc-800 px-6 py-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/30">
              🛡
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Sentinel
              </h1>
              <p className="text-xs text-zinc-500">
                Fraud Intelligence
              </p>
            </div>
          </div>
        </div>

        <nav className="space-y-1.5 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isRestrictedForRole =
              item.minRole && !item.minRole.includes(role);

            if (isRestrictedForRole) {
              return null;
            }

            const active = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <Icon size={19} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-zinc-800 p-5">
        <div className="flex items-center gap-3 rounded-xl border border-zinc-900 bg-zinc-900/60 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
            {userInitial}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-white">
              {user?.name || "Sentinel User"}
            </h3>

            <div className="mt-0.5 flex items-center gap-2">
              <span
                className={`inline-block rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${roleColor}`}
              >
                {role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}