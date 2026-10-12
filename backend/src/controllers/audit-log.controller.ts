import { Request, Response } from "express";
import { getAuditLogs } from "../services/audit-log.service";

export async function getAll(req: Request, res: Response) {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    const search = String(req.query.search ?? "");

    const sort =
      (req.query.sort as "asc" | "desc") ?? "desc";

    const result = await getAuditLogs(
      page,
      limit,
      search,
      sort
    );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch audit logs",
    });
  }
}