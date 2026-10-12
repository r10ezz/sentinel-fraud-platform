"use client";

import {
  CreditCard,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  FolderOpen,
  CheckCheck,
} from "lucide-react";

interface Props {
  overview: {
    totalTransactions: number;
    safeTransactions: number;
    flaggedTransactions: number;
    confirmedFraud: number;
    totalCases: number;
    openCases: number;
    resolvedCases: number;
  };
}

const cards = [
  {
    key: "totalTransactions",
    label: "Transactions",
    icon: CreditCard,
  },
  {
    key: "safeTransactions",
    label: "Safe",
    icon: CheckCircle,
  },
  {
    key: "flaggedTransactions",
    label: "Flagged",
    icon: AlertTriangle,
  },
  {
    key: "confirmedFraud",
    label: "Fraud",
    icon: ShieldAlert,
  },
  {
    key: "openCases",
    label: "Open Cases",
    icon: FolderOpen,
  },
  {
    key: "resolvedCases",
    label: "Resolved",
    icon: CheckCheck,
  },
] as const;

export default function OverviewCards({
  overview,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="rounded-xl border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {card.label}
              </p>

              <Icon
                size={18}
                className="text-muted-foreground"
              />
            </div>

            <h2 className="mt-4 text-3xl font-bold">
              {
                overview[
                  card.key as keyof typeof overview
                ]
              }
            </h2>
          </div>
        );
      })}
    </div>
  );
}