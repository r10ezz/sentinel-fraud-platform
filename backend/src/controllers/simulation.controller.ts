import { Request, Response } from "express";
import { startSimulation } from "../services/simulation.service";

export async function start(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { type, duration } = req.body;

    const result = await startSimulation(
      userId,
      type ?? "mixed",
      duration ?? 30
    );

    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to start simulation",
    });
  }
}
