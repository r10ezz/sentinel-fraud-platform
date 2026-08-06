import { Request, Response } from "express";
import { getDashboardData } from "../services/dashboard.service";

export async function getDashboard(req: Request, res: Response) {
  try {
    const dashboard = await getDashboardData();

    return res.json({
      success: true,
      ...dashboard,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to load dashboard",
    });
  }
}