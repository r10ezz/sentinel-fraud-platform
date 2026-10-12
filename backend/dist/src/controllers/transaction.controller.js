"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
exports.getAll = getAll;
exports.getOne = getOne;
const transaction_service_1 = require("../services/transaction.service");
const transaction_validator_1 = require("../validators/transaction.validator");
async function create(req, res) {
    try {
        const parsed = transaction_validator_1.createTransactionSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid request body",
                errors: parsed.error.flatten().fieldErrors,
            });
        }
        const transaction = await (0, transaction_service_1.createTransaction)(parsed.data);
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
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = typeof req.query.search === "string" ? req.query.search : "";
        const status = typeof req.query.status === "string"
            ? req.query.status
            : undefined;
        const country = typeof req.query.country === "string"
            ? req.query.country
            : undefined;
        const sort = req.query.sort === "asc" ? "asc" : "desc";
        const result = await (0, transaction_service_1.getAllTransactions)({
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to fetch transactions",
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
