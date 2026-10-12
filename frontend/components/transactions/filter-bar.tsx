"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  status: string;
  country: string;
  sort: "asc" | "desc";

  onStatusChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onSortChange: (value: "asc" | "desc") => void;
}

const STATUS_LABELS: Record<string, string> = {
  ALL: "All Status",
  SAFE: "Safe",
  FLAGGED: "Flagged",
  CONFIRMED_FRAUD: "Confirmed Fraud",
};

const SORT_LABELS: Record<"asc" | "desc", string> = {
  asc: "Oldest",
  desc: "Newest",
};

export default function FilterBar({
  status,
  country,
  sort,
  onStatusChange,
  onCountryChange,
  onSortChange,
}: Props) {
  return (
    <div className="flex gap-3">

      {/* Status */}

      <Select
        value={status}
        onValueChange={(value) => onStatusChange(value ?? "ALL")}
      >
        <SelectTrigger className="w-44">
          <SelectValue>
            {STATUS_LABELS[status]}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Status</SelectItem>
          <SelectItem value="SAFE">Safe</SelectItem>
          <SelectItem value="FLAGGED">Flagged</SelectItem>
          <SelectItem value="CONFIRMED_FRAUD">
            Confirmed Fraud
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Country */}

      <Select
        value={country}
        onValueChange={(value) => onCountryChange(value ?? "ALL")}
      >
        <SelectTrigger className="w-44">
          <SelectValue>
            {country === "ALL" ? "All Countries" : country}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Countries</SelectItem>
          <SelectItem value="India">India</SelectItem>
          <SelectItem value="Russia">Russia</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort */}

      <Select
        value={sort}
        onValueChange={(value) =>
          onSortChange((value ?? "desc") as "asc" | "desc")
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue>
            {SORT_LABELS[sort]}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="desc">Newest</SelectItem>
          <SelectItem value="asc">Oldest</SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}