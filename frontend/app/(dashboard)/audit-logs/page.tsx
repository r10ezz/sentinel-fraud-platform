"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

import { Input } from "@/components/ui/input";

import AuditLogTable from "@/components/audit-logs/audit-log-table";
import Pagination from "@/components/transactions/pagination";
import { useAuditLogs } from "@/hooks/use-audit-logs";

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(search, 400);

  const { data, isLoading } = useAuditLogs({
    page,
    limit: 20,
    search: debouncedSearch,
    sort: "desc",
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Failed to load audit logs.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Audit Logs
        </h1>

        <p className="text-muted-foreground mt-2">
          Track every important action performed in Sentinel.
        </p>

      </div>

      <Input
        placeholder="Search logs..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <AuditLogTable
        logs={data.logs}
      />

      <Pagination
        page={data.pagination.page}
        totalPages={data.pagination.totalPages}
        onPageChange={setPage}
      />

    </div>
  );
}
