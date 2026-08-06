"use client";

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

interface Props {
  transactions: Transaction[];
}

export default function TransactionsTable({
  transactions,
}: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">

      <h2 className="mb-6 text-lg font-semibold">
        Recent Transactions
      </h2>

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>Merchant</TableHead>

            <TableHead>Amount</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Risk</TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {transactions.map((transaction) => (

            <TableRow key={transaction.id}>

              <TableCell>
                {transaction.merchant}
              </TableCell>

              <TableCell>
                ₹{transaction.amount}
              </TableCell>

              <TableCell>

                <Badge
                  variant={
                    transaction.status === "CONFIRMED_FRAUD"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {transaction.status}
                </Badge>

              </TableCell>

              <TableCell>
                {transaction.riskScore}
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>
  );
}