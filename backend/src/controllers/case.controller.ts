import { Request, Response } from "express";
import { CaseStatus, Priority, AuditAction, EntityType } from "@prisma/client";

import {
  getAllCases,
  getCaseById,
  assignCase,
  resolveCase,
} from "../services/case.service";
import { createAuditLog } from "../services/audit.service";
import { AuthRequest } from "../middleware/auth.middleware";

export async function getAll(req: Request, res: Response) {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    const search = String(req.query.search ?? "");

    const status = req.query.status as CaseStatus | undefined;
    const priority = req.query.priority as Priority | undefined;

    const sort =
      (req.query.sort as "asc" | "desc") ?? "desc";

    const result = await getAllCases(
      page,
      limit,
      search,
      status,
      priority,
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
          : "Failed to fetch cases",
    });
  }
}

export async function getOne(req: Request, res: Response) {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Case ID is required",
      });
    }

    const fraudCase = await getCaseById(id);

    if (!fraudCase) {
      return res.status(404).json({
        success: false,
        message: "Case not found",
      });
    }

    return res.status(200).json({
      success: true,
      case: fraudCase,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch case",
    });
  }
}

export async function assign(req: Request, res: Response) {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const { analystId } = req.body;

    if (!id || !analystId) {
      return res.status(400).json({
        success: false,
        message: "Case ID and analyst ID are required",
      });
    }

    const updated = await assignCase(id, analystId);

    const actorId = (req as AuthRequest).user?.id || analystId;
    await createAuditLog({
      userId: actorId,
      action: AuditAction.ASSIGN_CASE,
      entityType: EntityType.CASE,
      entityId: id,
      description: `Case investigation assigned to analyst ${analystId}`,
    });

    return res.status(200).json({
      success: true,
      case: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to assign case",
    });
  }
}

export async function resolve(req: Request, res: Response) {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Case ID is required",
      });
    }

    const updated = await resolveCase(id);

    const actorId = (req as AuthRequest).user?.id || updated.assignedToId;
    if (actorId) {
      await createAuditLog({
        userId: actorId,
        action: AuditAction.RESOLVE_CASE,
        entityType: EntityType.CASE,
        entityId: id,
        description: `Case ${id} marked as resolved`,
      });
    }

    return res.status(200).json({
      success: true,
      case: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to resolve case",
    });
  }
}