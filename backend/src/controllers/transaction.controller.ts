import { Request, Response } from "express";
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
} from "../services/transaction.service";

export async function create(req: Request, res: Response) {
  try {
    const transaction = await createTransaction(req.body);

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
    const transactions = await getAllTransactions();

    return res.json({
      success: true,
      transactions,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
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