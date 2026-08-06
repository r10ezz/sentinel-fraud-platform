"use client";

import {
  LayoutDashboard,
  CreditCard,
  ShieldAlert,
  BarChart3,
  Settings,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    icon: CreditCard,
  },
  {
    title: "Cases",
    icon: ShieldAlert,
  },
  {
    title: "Analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-zinc-800 bg-zinc-950 flex flex-col justify-between">

      <div>

        <div className="border-b border-zinc-800 px-6 py-6">

          <h1 className="text-2xl font-bold tracking-tight">
            🛡 Sentinel
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Fraud Intelligence
          </p>

        </div>

        <nav className="p-4 space-y-2">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
              >
                <Icon size={20} />

                <span>{item.title}</span>
              </button>
            );
          })}

        </nav>

      </div>

      <div className="border-t border-zinc-800 p-6">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-semibold">

            R

          </div>

          <div>

            <h3 className="font-medium">
              Raj Singh
            </h3>

            <p className="text-sm text-zinc-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}