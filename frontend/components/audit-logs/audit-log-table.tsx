"use client";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface Props {
  logs: any[];
}

export default function AuditLogTable({
  logs,
}: Props) {
  return (
    <div className="rounded-xl border bg-card">
      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>Action</TableHead>

            <TableHead>User</TableHead>

            <TableHead>Entity</TableHead>

            <TableHead>Description</TableHead>

            <TableHead>Date</TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {logs.map((log) => (

            <TableRow key={log.id}>

              <TableCell>
                {log.action.replaceAll("_", " ")}
              </TableCell>

              <TableCell>
                {log.user.name}
              </TableCell>

              <TableCell>
                {log.entityType}
              </TableCell>

              <TableCell>
                {log.description}
              </TableCell>

              <TableCell>
                {new Date(
                  log.createdAt
                ).toLocaleString()}
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>
    </div>
  );
}