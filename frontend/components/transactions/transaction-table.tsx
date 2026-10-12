"use client";

import { useState } from "react";

import { Transaction } from "@/types/dashboard";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TransactionDetailsSheet from "./transaction-details-sheet";

interface Props {
  transactions: Transaction[];
}

export default function TransactionTable({
  transactions,
}: Props) {
  const [selected, setSelected] = useState<Transaction | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="rounded-xl border bg-card">

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>Merchant</TableHead>

              <TableHead>Amount</TableHead>

              <TableHead>Country</TableHead>

              <TableHead>Risk</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Date</TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {transactions.map((transaction) => (

              <TableRow
                key={transaction.id}
                onClick={() => {
                  setSelected(transaction);
                  setOpen(true);
                }}
                className="cursor-pointer transition-colors hover:bg-muted/40"
              >

                <TableCell className="font-medium">
                  {transaction.merchant}
                </TableCell>

                <TableCell>
                  ₹{Number(transaction.amount).toLocaleString("en-IN")}
                </TableCell>

                <TableCell>
                  {transaction.country}
                </TableCell>

                <TableCell>

                  <span
                    className={
                      transaction.riskScore >= 80
                        ? "font-semibold text-red-500"
                        : transaction.riskScore >= 50
                        ? "font-semibold text-yellow-500"
                        : "font-semibold text-green-500"
                    }
                  >
                    {transaction.riskScore}
                  </span>

                </TableCell>

                <TableCell>

                  <Badge
                    variant={
                      transaction.status === "CONFIRMED_FRAUD"
                        ? "destructive"
                        : transaction.status === "FLAGGED"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {transaction.status.replaceAll("_", " ")}
                  </Badge>

                </TableCell>

                <TableCell>
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </div>

      <TransactionDetailsSheet
        open={open}
        onOpenChange={setOpen}
        transaction={selected}
      />
    </>
  );
}