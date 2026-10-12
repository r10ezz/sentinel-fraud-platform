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
  priority: string;
  sort: "asc" | "desc";

  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onSortChange: (value: "asc" | "desc") => void;
}

export default function FilterBar({
  status,
  priority,
  sort,
  onStatusChange,
  onPriorityChange,
  onSortChange,
}: Props) {
  return (
    <div className="flex gap-3">

      <Select
        value={status}
        onValueChange={(value) => onStatusChange(value ?? "ALL")}
      >
        <SelectTrigger className="w-44">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Status</SelectItem>
          <SelectItem value="OPEN">Open</SelectItem>
          <SelectItem value="IN_REVIEW">In Review</SelectItem>
          <SelectItem value="RESOLVED">Resolved</SelectItem>
        </SelectContent>

      </Select>

      <Select
        value={priority}
        onValueChange={(value) => onPriorityChange(value ?? "ALL")}
      >
        <SelectTrigger className="w-44">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Priority</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="LOW">Low</SelectItem>
        </SelectContent>

      </Select>

      <Select
        value={sort}
        onValueChange={(value) =>
          onSortChange((value ?? "desc") as "asc" | "desc")
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="desc">Newest</SelectItem>
          <SelectItem value="asc">Oldest</SelectItem>
        </SelectContent>

      </Select>

    </div>
  );
}