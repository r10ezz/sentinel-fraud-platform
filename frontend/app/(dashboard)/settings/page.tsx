"use client";

import { useAuthStore } from "@/store/auth-store";
import {
  Shield,
  Sliders,
  Users,
  CheckCircle2,
  AlertTriangle,
  Server,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Platform Settings & Fraud Rules
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review active risk engine heuristics, role-based authorization policies, and system status.
        </p>
      </div>

      {/* Rules Engine Heuristics */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
              <Sliders size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Active Fraud Detection Rules
              </h2>
              <p className="text-xs text-muted-foreground">
                Automated risk scoring thresholds calculated per transaction.
              </p>
            </div>
          </div>
          <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
            Engine Active
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Rule 1 */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Rule 1: High Transaction Amount</p>
                <p className="text-xs text-zinc-400 mt-1">
                  Triggers when single transaction exceeds threshold.
                </p>
              </div>
              <Badge variant="secondary" className="font-mono text-xs">
                +30 Risk
              </Badge>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs">
              <span className="text-zinc-500">Threshold:</span>
              <span className="font-mono font-bold text-amber-400">&gt; ₹50,000 INR</span>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Rule 2: Geographic Anomaly</p>
                <p className="text-xs text-zinc-400 mt-1">
                  International transaction outside primary domestic region.
                </p>
              </div>
              <Badge variant="secondary" className="font-mono text-xs">
                +25 Risk
              </Badge>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs">
              <span className="text-zinc-500">Domestic Baseline:</span>
              <span className="font-mono font-bold text-blue-400">India</span>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Rule 3: Unknown Merchant</p>
                <p className="text-xs text-zinc-400 mt-1">
                  Merchant not present in vetted enterprise whitelist.
                </p>
              </div>
              <Badge variant="secondary" className="font-mono text-xs">
                +20 Risk
              </Badge>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs">
              <span className="text-zinc-500">Whitelisted:</span>
              <span className="truncate max-w-[200px] text-zinc-300">Swiggy, Amazon, Uber, Blinkit, etc.</span>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Rule 4: ATM Cash Withdrawal</p>
                <p className="text-xs text-zinc-400 mt-1">
                  Immediate cash-out channel without 3DS validation.
                </p>
              </div>
              <Badge variant="secondary" className="font-mono text-xs">
                +15 Risk
              </Badge>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs">
              <span className="text-zinc-500">Channel Type:</span>
              <span className="font-mono font-bold text-purple-400">ATM</span>
            </div>
          </div>
        </div>

        {/* Risk Thresholds Summary */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
            System Action Classification Thresholds
          </h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3">
              <span className="text-xs text-green-400 font-semibold">Safe Activity</span>
              <p className="text-lg font-black text-green-400">0 – 39</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Approved & Logged</p>
            </div>
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3">
              <span className="text-xs text-yellow-400 font-semibold">Flagged for Review</span>
              <p className="text-lg font-black text-yellow-400">40 – 79</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Creates Case in Review</p>
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
              <span className="text-xs text-red-400 font-semibold">Confirmed Fraud</span>
              <p className="text-lg font-black text-red-400">80 – 100</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Instant Alert & High Priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* Role-Based Access Control (RBAC) Policy Matrix */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400">
            <Users size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              Role-Based Access Control (RBAC) Matrix
            </h2>
            <p className="text-xs text-muted-foreground">
              Configured authorization privileges across Sentinel roles.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-xs uppercase tracking-wider text-zinc-400">
                <th className="pb-3">Capability / Feature</th>
                <th className="pb-3">ADMIN</th>
                <th className="pb-3">ANALYST</th>
                <th className="pb-3">VIEWER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              <tr>
                <td className="py-3 font-medium text-white">View Dashboard & Telemetry</td>
                <td className="py-3 text-green-400 font-semibold">Allowed</td>
                <td className="py-3 text-green-400 font-semibold">Allowed</td>
                <td className="py-3 text-green-400 font-semibold">Allowed</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">View Transactions & Risk Scores</td>
                <td className="py-3 text-green-400 font-semibold">Allowed</td>
                <td className="py-3 text-green-400 font-semibold">Allowed</td>
                <td className="py-3 text-green-400 font-semibold">Allowed</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Inject Manual Transactions</td>
                <td className="py-3 text-green-400 font-semibold">Allowed</td>
                <td className="py-3 text-green-400 font-semibold">Allowed</td>
                <td className="py-3 text-zinc-500">Read-Only</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Investigate & Resolve Fraud Cases</td>
                <td className="py-3 text-green-400 font-semibold">Allowed</td>
                <td className="py-3 text-green-400 font-semibold">Allowed</td>
                <td className="py-3 text-zinc-500">Read-Only</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Inspect Regulatory Audit Trail</td>
                <td className="py-3 text-green-400 font-semibold">Allowed</td>
                <td className="py-3 text-green-400 font-semibold">Allowed</td>
                <td className="py-3 text-zinc-500">Restricted</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white">Execute Traffic Simulation Engine</td>
                <td className="py-3 text-purple-400 font-semibold">Admin Only</td>
                <td className="py-3 text-zinc-500">Restricted</td>
                <td className="py-3 text-zinc-500">Restricted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Session Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 text-xs">
              Role: {user?.role || "VIEWER"}
            </Badge>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <Zap size={14} />
              Session Valid
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
