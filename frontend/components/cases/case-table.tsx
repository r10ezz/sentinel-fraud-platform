"use client";

import { useState } from "react";
import { FraudCase } from "@/types/dashboard";
import StatusBadge from "./status-badge";
import CaseDetailsSheet from "./case-details-sheet";

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
  cases: FraudCase[];
}

export default function CaseTable({ cases }: Props) {
  const [selectedCase, setSelectedCase] = useState<FraudCase | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  function handleRowClick(fraudCase: FraudCase) {
    setSelectedCase(fraudCase);
    setSheetOpen(true);
  }

  return (
    <>
      <div className="rounded-xl border border-zinc-800 bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead>Title</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cases.length === 0 && (
              <TableRow className="border-zinc-800">
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  No cases found.
                </TableCell>
              </TableRow>
            )}

            {cases.map((fraudCase) => (
              <TableRow
                key={fraudCase.id}
                onClick={() => handleRowClick(fraudCase)}
                className="cursor-pointer border-zinc-800 transition-colors hover:bg-zinc-800/40"
              >
                <TableCell>
                  <div>
                    <p className="font-medium text-white">{fraudCase.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                      {fraudCase.description}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="font-medium text-zinc-300">
                  {fraudCase.transaction?.merchant || "Unknown"}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      fraudCase.priority === "HIGH"
                        ? "destructive"
                        : fraudCase.priority === "MEDIUM"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {fraudCase.priority}
                  </Badge>
                </TableCell>

                <TableCell>
                  <StatusBadge status={fraudCase.status} />
                </TableCell>

                <TableCell>
                  {fraudCase.assignedTo ? (
                    <span className="font-medium text-blue-400">
                      {fraudCase.assignedTo.name}
                    </span>
                  ) : (
                    <span className="text-zinc-500">Unassigned</span>
                  )}
                </TableCell>

                <TableCell className="text-zinc-400">
                  {new Date(fraudCase.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CaseDetailsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        caseItem={selectedCase}
      />
    </>
  );
}