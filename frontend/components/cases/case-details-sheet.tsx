"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ShieldAlert,
  CheckCircle2,
  UserCheck,
  CreditCard,
  Globe,
  MapPin,
  AlertTriangle,
  Loader2,
  Calendar,
  Lock,
} from "lucide-react";
import { FraudCase } from "@/types/dashboard";
import { assignCase, resolveCase } from "@/services/case";
import { useAuthStore } from "@/store/auth-store";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseItem: FraudCase | null;
}

export default function CaseDetailsSheet({
  open,
  onOpenChange,
  caseItem,
}: Props) {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const canManage = user?.role === "ADMIN" || user?.role === "ANALYST";

  const [loadingAssign, setLoadingAssign] = useState(false);
  const [loadingResolve, setLoadingResolve] = useState(false);

  if (!caseItem) return null;

  async function handleAssign() {
    if (!caseItem || !user?.id) return;
    try {
      setLoadingAssign(true);
      await assignCase(caseItem.id, user.id);
      toast.success("Case assigned to you for investigation");
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["audit-logs"] });
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to assign case");
    } finally {
      setLoadingAssign(false);
    }
  }

  async function handleResolve() {
    if (!caseItem) return;
    try {
      setLoadingResolve(true);
      await resolveCase(caseItem.id);
      toast.success("Case marked as resolved");
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["audit-logs"] });
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to resolve case");
    } finally {
      setLoadingResolve(false);
    }
  }

  const tx = caseItem.transaction;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] overflow-y-auto border-zinc-800 bg-zinc-950 text-white">
        <SheetHeader>
          <div className="flex items-center justify-between mt-2">
            <Badge
              variant={
                caseItem.priority === "HIGH"
                  ? "destructive"
                  : caseItem.priority === "MEDIUM"
                  ? "secondary"
                  : "outline"
              }
            >
              {caseItem.priority} PRIORITY
            </Badge>

            <Badge
              className={
                caseItem.status === "RESOLVED"
                  ? "bg-green-500/10 text-green-400 border-green-500/30"
                  : caseItem.status === "IN_REVIEW"
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/30"
              }
            >
              {caseItem.status.replaceAll("_", " ")}
            </Badge>
          </div>

          <SheetTitle className="text-2xl font-bold text-white mt-3 text-left">
            {caseItem.title}
          </SheetTitle>
          <p className="text-sm text-zinc-400 text-left">
            {caseItem.description}
          </p>
        </SheetHeader>

        {/* Action Panel for Analysts / Admins */}
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
            Investigation Actions
          </h4>

          {canManage ? (
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Button
                onClick={handleAssign}
                disabled={loadingAssign || caseItem.status === "RESOLVED"}
                className="flex-1 bg-blue-600 font-medium text-white hover:bg-blue-500"
              >
                {loadingAssign ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <UserCheck className="mr-2 h-4 w-4" />
                )}
                {caseItem.assignedTo?.id === user?.id
                  ? "Re-assign to Me"
                  : "Assign to Me"}
              </Button>

              <Button
                onClick={handleResolve}
                disabled={loadingResolve || caseItem.status === "RESOLVED"}
                className="flex-1 bg-green-600 font-medium text-white hover:bg-green-500 disabled:opacity-40"
              >
                {loadingResolve ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                )}
                {caseItem.status === "RESOLVED" ? "Resolved" : "Mark Resolved"}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-400">
              <Lock size={14} className="text-zinc-500" />
              <span>You have <strong>VIEWER</strong> role. Case management requires <strong>ANALYST</strong> or <strong>ADMIN</strong> permissions.</span>
            </div>
          )}

          {caseItem.assignedTo && (
            <p className="mt-3 text-xs text-zinc-400">
              Currently assigned to: <strong className="text-white">{caseItem.assignedTo.name}</strong> ({caseItem.assignedTo.email})
            </p>
          )}
        </div>

        {/* Underlying Transaction Details */}
        {tx && (
          <div className="mt-6 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Flagged Transaction Metadata
            </h4>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500">Merchant</p>
                  <p className="text-lg font-bold text-white">{tx.merchant}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500">Transaction Amount</p>
                  <p className="text-2xl font-black text-green-400">
                    ₹{Number(tx.amount).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <Separator className="bg-zinc-800" />

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-zinc-300">
                  <CreditCard size={16} className="text-zinc-500" />
                  <span>Type: <strong className="text-white">{tx.transactionType}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Globe size={16} className="text-zinc-500" />
                  <span>Country: <strong className="text-white">{tx.country}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <MapPin size={16} className="text-zinc-500" />
                  <span>City: <strong className="text-white">{tx.city}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Calendar size={16} className="text-zinc-500" />
                  <span>Date: <strong className="text-white">{new Date(tx.createdAt).toLocaleDateString()}</strong></span>
                </div>
              </div>

              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="text-red-400" size={20} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-red-300">
                      Evaluated Risk Score
                    </p>
                    <p className="text-xs text-zinc-400">
                      Exceeded automated fraud mitigation threshold
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-black text-red-400">
                  {tx.riskScore}/100
                </div>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
