import { Request, Response } from "express";
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
} from "../services/transaction.service";
import { createTransactionSchema } from "../validators/transaction.validator";

export async function create(req: Request, res: Response) {
  try {
    const parsed = createTransactionSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const transaction = await createTransaction(parsed.data);

    return res.status(201).json({
      success: true,
      ...transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create transaction",
    });
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const search =
      typeof req.query.search === "string" ? req.query.search : "";

    const status =
      typeof req.query.status === "string"
        ? (req.query.status as any)
        : undefined;

    const country =
      typeof req.query.country === "string"
        ? req.query.country
        : undefined;

    const sort =
      req.query.sort === "asc" ? "asc" : "desc";

    const result = await getAllTransactions({
      page,
      limit,
      search,
      status,
      country,
      sort,
    });

    return res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch transactions",
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
        message: "Transaction ID is required",
      });
    }

    const transaction = await getTransactionById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.json({
      success: true,
      transaction,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch transaction",
    });
  }
}
