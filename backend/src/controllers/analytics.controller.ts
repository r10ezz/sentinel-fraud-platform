import { Request, Response } from "express";
import { getAnalytics } from "../services/analytics.service";

export async function getOverview(
  req: Request,
  res: Response
) {
  try {
    const analytics = await getAnalytics();

    return res.status(200).json({
      success: true,
      ...analytics,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch analytics",
    });
  }
}