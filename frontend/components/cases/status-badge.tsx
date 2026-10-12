"use client";

import { Badge } from "@/components/ui/badge";

export default function StatusBadge({
  status,
}: {
  status: string;
}) {
  if (status === "OPEN")
    return <Badge variant="destructive">Open</Badge>;

  if (status === "IN_REVIEW")
    return <Badge variant="secondary">In Review</Badge>;

  return <Badge variant="outline">Resolved</Badge>;
}