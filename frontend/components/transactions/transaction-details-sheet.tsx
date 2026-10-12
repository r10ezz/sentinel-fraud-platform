"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import {
  MapPin,
  Globe,
  ShieldAlert,
  Monitor,
  Wifi,
  CreditCard,
  Calendar,
  CircleDollarSign,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { Transaction } from "@/types/dashboard";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
}

export default function TransactionDetailsSheet({
  open,
  onOpenChange,
  transaction,
}: Props) {
  if (!transaction) return null;

  const riskColor =
    transaction.riskScore >= 80
      ? "text-red-500"
      : transaction.riskScore >= 50
      ? "text-yellow-500"
      : "text-green-500";

  const riskBg =
    transaction.riskScore >= 80
      ? "bg-red-500/10 border-red-500/30"
      : transaction.riskScore >= 50
      ? "bg-yellow-500/10 border-yellow-500/30"
      : "bg-green-500/10 border-green-500/30";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[620px] overflow-y-auto">

        <SheetHeader>
          <SheetTitle className="text-2xl">
            Transaction Investigation
          </SheetTitle>
        </SheetHeader>

        {/* HERO */}

        <div
          className={`mt-8 rounded-2xl border p-6 ${riskBg}`}
        >
          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Merchant
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                {transaction.merchant}
              </h2>

              <div className="mt-6 flex items-center gap-2">

                <CircleDollarSign
                  className="text-green-500"
                  size={22}
                />

                <span className="text-4xl font-bold">
                  ₹
                  {Number(
                    transaction.amount
                  ).toLocaleString("en-IN")}
                </span>

              </div>

            </div>

            <div className="text-right">

              <div
                className={`text-5xl font-black ${riskColor}`}
              >
                {transaction.riskScore}
              </div>

              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Risk Score
              </p>

            </div>

          </div>

          <Separator className="my-6" />

          <div className="flex items-center justify-between">

            <Badge
              variant={
                transaction.status ===
                "CONFIRMED_FRAUD"
                  ? "destructive"
                  : transaction.status ===
                    "FLAGGED"
                  ? "secondary"
                  : "outline"
              }
            >
              {transaction.status.replaceAll(
                "_",
                " "
              )}
            </Badge>

            <div
              className={`flex items-center gap-2 text-sm font-medium ${riskColor}`}
            >
              {transaction.riskScore >= 80 ? (
                <AlertTriangle size={16} />
              ) : (
                <CheckCircle2 size={16} />
              )}

              {transaction.riskScore >= 80
                ? "Immediate Investigation Required"
                : "Risk Within Threshold"}

            </div>

          </div>

        </div>

        {/* RISK */}

        <Section title="Risk Analysis">

          <Row
            icon={<ShieldAlert size={18} />}
            label="Risk Score"
            value={`${transaction.riskScore}/100`}
          />

          <Progress
            value={transaction.riskScore}
            className="mt-5"
          />

        </Section>

        {/* TRANSACTION */}

        <Section title="Transaction Information">

          <Row
            icon={<CreditCard size={18} />}
            label="Transaction Type"
            value={transaction.transactionType}
          />

          <Row
            icon={<Calendar size={18} />}
            label="Created At"
            value={new Date(
              transaction.createdAt
            ).toLocaleString()}
          />

        </Section>

                {/* LOCATION */}

        <Section title="Location">

          <Row
            icon={<Globe size={18} />}
            label="Country"
            value={transaction.country}
          />

          <Row
            icon={<MapPin size={18} />}
            label="City"
            value={transaction.city}
          />

        </Section>

        {/* DEVICE */}

        <Section title="Device & Network">

          <Row
            icon={<Monitor size={18} />}
            label="Device ID"
            value={transaction.deviceId}
          />

          <Row
            icon={<Wifi size={18} />}
            label="IP Address"
            value={transaction.ipAddress}
          />

        </Section>

        {/* CASE */}

        {transaction.case && (

          <Section title="Fraud Investigation">

            <Row
              icon={<ShieldAlert size={18} />}
              label="Case"
              value={transaction.case.title}
            />

            <Row
              icon={<AlertTriangle size={18} />}
              label="Priority"
              value={transaction.case.priority}
            />

            <Row
              icon={<CheckCircle2 size={18} />}
              label="Status"
              value={transaction.case.status.replaceAll(
                "_",
                " "
              )}
            />

          </Section>

        )}

      </SheetContent>

    </Sheet>

  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

      <h3 className="mb-5 text-lg font-semibold">
        {title}
      </h3>

      <div className="space-y-5">
        {children}
      </div>

    </section>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">

        {icon}

      </div>

      <div className="flex-1">

        <p className="text-xs uppercase tracking-wide text-zinc-500">

          {label}

        </p>

        <p className="mt-1 text-sm font-semibold break-all">

          {value}

        </p>

      </div>

    </div>
  );
}