"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

import SearchBar from "@/components/transactions/search-bar";
import FilterBar from "@/components/transactions/filter-bar";
import TransactionTable from "@/components/transactions/transaction-table";
import Pagination from "@/components/transactions/pagination";
import SimulationCard from "@/components/simulation/simulation-card";
import CreateTransactionDialog from "@/components/transactions/create-transaction-dialog";

import { useTransactions } from "@/hooks/use-transactions";

export default function TransactionsPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [country, setCountry] = useState("ALL");
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [debouncedSearch] = useDebounce(search, 400);

  const { data, isLoading } = useTransactions({
    page,
    limit: 10,
    search: debouncedSearch,
    status,
    country,
    sort,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Transactions
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor, filter, and manually test banking transactions through the risk engine.
          </p>
        </div>

        <CreateTransactionDialog />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchBar
              value={search}
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
            />

            <FilterBar
              status={status}
              country={country}
              sort={sort}
              onStatusChange={(value) => {
                setStatus(value);
                setPage(1);
              }}
              onCountryChange={(value) => {
                setCountry(value);
                setPage(1);
              }}
              onSortChange={(value) => {
                setSort(value);
                setPage(1);
              }}
            />
          </div>

          {isLoading ? (
            <div className="flex h-64 items-center justify-center rounded-xl border border-zinc-800 bg-card text-muted-foreground">
              Loading transactions...
            </div>
          ) : (
            <TransactionTable transactions={data?.transactions ?? []} />
          )}

          <Pagination
            page={data?.pagination.page ?? 1}
            totalPages={data?.pagination.totalPages ?? 1}
            onPageChange={setPage}
          />
        </div>

        <div>
          <SimulationCard />
        </div>
      </div>
    </div>
  );
}