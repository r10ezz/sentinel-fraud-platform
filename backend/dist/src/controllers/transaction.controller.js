"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.getAll = getAll;
exports.getOne = getOne;
const transaction_service_1 = require("../services/transaction.service");
async function create(req, res) {
    try {
        const transaction = await (0, transaction_service_1.createTransaction)(req.body);
        return res.status(201).json({
            success: true,
            ...transaction,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to create transaction",
        });
    }
}
async function getAll(req, res) {
    try {
        const transactions = await (0, transaction_service_1.getAllTransactions)();
        return res.json({
            success: true,
            transactions,
        });
    }
    catch {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch transactions",
        });
    }
}
async function getOne(req, res) {
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
        const transaction = await (0, transaction_service_1.getTransactionById)(id);
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
    }
    catch {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch transaction",
        });
    }
}
