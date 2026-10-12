"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

import SearchBar from "@/components/transactions/search-bar";
import Pagination from "@/components/transactions/pagination";

import FilterBar from "@/components/cases/filter-bar";
import CaseTable from "@/components/cases/case-table";

import { useCases } from "@/hooks/use-cases";

export default function CasesPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");

  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [debouncedSearch] = useDebounce(search, 400);

  const { data, isLoading } = useCases({
    page,
    limit: 10,
    search: debouncedSearch,
    status,
    priority,
    sort,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-4xl font-bold">
          Fraud Cases
        </h1>

        <p className="text-muted-foreground">
          Review and manage fraud investigations.
        </p>

      </div>

      <div className="flex items-center justify-between">

        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />

        <FilterBar
          status={status}
          priority={priority}
          sort={sort}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          onPriorityChange={(value) => {
            setPriority(value);
            setPage(1);
          }}
          onSortChange={(value) => {
            setSort(value);
            setPage(1);
          }}
        />

      </div>

      <CaseTable
        cases={data?.cases ?? []}
      />

      <Pagination
        page={data?.pagination.page ?? 1}
        totalPages={data?.pagination.totalPages ?? 1}
        onPageChange={setPage}
      />

    </div>
  );
}