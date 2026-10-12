"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus, ShieldAlert, Sparkles, Lock } from "lucide-react";
import { toast } from "sonner";

import { useCreateTransaction } from "@/hooks/use-create-transaction";
import { useAuthStore } from "@/store/auth-store";

export default function CreateTransactionDialog() {
  const [open, setOpen] = useState(false);
  const mutation = useCreateTransaction();
  const user = useAuthStore((state) => state.user);
  const canCreate = user?.role === "ADMIN" || user?.role === "ANALYST";

  const [form, setForm] = useState({
    amount: "1450",
    merchant: "Swiggy",
    city: "Bangalore",
    country: "India",
    ipAddress: "103.21.244.12",
    deviceId: "DEV-BLR-8492",
    transactionType: "UPI",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function applyPreset(type: "safe" | "flagged" | "fraud") {
    if (type === "safe") {
      setForm({
        amount: "1200",
        merchant: "Swiggy",
        city: "Bangalore",
        country: "India",
        ipAddress: "103.21.244.10",
        deviceId: "DEV-SAFE-100",
        transactionType: "UPI",
      });
    } else if (type === "flagged") {
      setForm({
        amount: "55000",
        merchant: "ApexElectronics",
        city: "Mumbai",
        country: "India",
        ipAddress: "115.96.12.8",
        deviceId: "DEV-ATM-4421",
        transactionType: "ATM",
      });
    } else {
      setForm({
        amount: "95000",
        merchant: "CryptoWorld Vault",
        city: "Moscow",
        country: "Russia",
        ipAddress: "185.220.101.5",
        deviceId: "DEV-DARK-9901",
        transactionType: "ATM",
      });
    }
  }

  async function submit() {
    if (!user?.id) {
      toast.error("Session expired. Please log in again.");
      return;
    }

    try {
      await mutation.mutateAsync({
        ...form,
        userId: user.id,
        amount: Number(form.amount),
      });

      toast.success("Transaction submitted to Risk Engine!");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create transaction");
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-blue-600 font-medium text-white hover:bg-blue-500 shadow-md shadow-blue-600/20"
        disabled={!canCreate}
        title={!canCreate ? "Requires Admin or Analyst role" : "New Transaction"}
      >
        {!canCreate ? (
          <Lock className="mr-2 h-4 w-4 text-zinc-400" />
        ) : (
          <Plus className="mr-2 h-4 w-4" />
        )}
        New Transaction
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-950 text-white sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <ShieldAlert className="text-blue-500" size={20} />
            Inject Banking Transaction
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Submit a transaction to evaluate through Sentinel's live fraud detection rules.
          </DialogDescription>
        </DialogHeader>

        {/* Quick Test Presets */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <Sparkles size={13} className="text-amber-400" /> Quick Rule Presets:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => applyPreset("safe")}
              className="rounded-lg border border-green-500/30 bg-green-500/10 px-2 py-1.5 text-xs font-medium text-green-300 transition hover:bg-green-500/20"
            >
              🟢 Safe UPI (&lt;₹50k)
            </button>
            <button
              type="button"
              onClick={() => applyPreset("flagged")}
              className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-2 py-1.5 text-xs font-medium text-yellow-300 transition hover:bg-yellow-500/20"
            >
              🟡 Flagged ATM
            </button>
            <button
              type="button"
              onClick={() => applyPreset("fraud")}
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-2 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-500/20"
            >
              🔴 Intl Fraud (&gt;₹50k)
            </button>
          </div>
        </div>

        <div className="grid gap-3.5 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">
                Amount (INR)
              </label>
              <Input
                placeholder="Amount"
                type="number"
                value={form.amount}
                onChange={(e) => update("amount", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">
                Transaction Type
              </label>
              <Select
                value={form.transactionType}
                onValueChange={(value) =>
                  update("transactionType", value ?? "UPI")
                }
              >
                <SelectTrigger className="border-zinc-800 bg-zinc-900 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-zinc-800 bg-zinc-900 text-white">
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="CARD">Card</SelectItem>
                  <SelectItem value="ATM">ATM Withdrawal</SelectItem>
                  <SelectItem value="NET_BANKING">Net Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-400">
              Merchant Name
            </label>
            <Input
              placeholder="e.g. Swiggy, Amazon, CryptoWorld"
              value={form.merchant}
              onChange={(e) => update("merchant", e.target.value)}
              className="border-zinc-800 bg-zinc-900 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">
                City
              </label>
              <Input
                placeholder="City"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">
                Country
              </label>
              <Input
                placeholder="Country (e.g. India, Russia)"
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">
                IP Address
              </label>
              <Input
                placeholder="IP Address"
                value={form.ipAddress}
                onChange={(e) => update("ipAddress", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-400">
                Device Fingerprint
              </label>
              <Input
                placeholder="Device ID"
                value={form.deviceId}
                onChange={(e) => update("deviceId", e.target.value)}
                className="border-zinc-800 bg-zinc-900 text-white font-mono text-xs"
              />
            </div>
          </div>

          <Button
            onClick={submit}
            disabled={mutation.isPending}
            className="mt-2 w-full bg-blue-600 font-semibold text-white hover:bg-blue-500"
          >
            {mutation.isPending
              ? "Evaluating Risk Engine..."
              : "Evaluate & Submit Transaction"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}

