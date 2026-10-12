import { Request, Response } from "express";
import { loginUser } from "../services/auth.service";
import { findUserById } from "../services/user.service";
import { createAuditLog } from "../services/audit.service";
import { AuditAction, EntityType } from "@prisma/client";
import { AuthRequest } from "../middleware/auth.middleware";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await loginUser(email, password);

    // Audit log successful login
    await createAuditLog({
      userId: result.user.id,
      action: AuditAction.LOGIN,
      entityType: EntityType.USER,
      entityId: result.user.id,
      description: `User ${result.user.name} (${result.user.role}) logged in successfully`,
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
}

export async function getMe(req: Request, res: Response) {
  try {
    const userId = (req as AuthRequest).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { password: _, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch user profile",
    });
  }
}

