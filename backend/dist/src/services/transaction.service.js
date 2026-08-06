"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = createTransaction;
exports.getAllTransactions = getAllTransactions;
exports.getTransactionById = getTransactionById;
const prisma_1 = __importDefault(require("../lib/prisma"));
const client_1 = require("@prisma/client");
const risk_service_1 = require("./risk.service");
const audit_service_1 = require("./audit.service");
const case_service_1 = require("./case.service");
async function createTransaction(data) {
    const risk = (0, risk_service_1.calculateRisk)({
        amount: data.amount,
        merchant: data.merchant,
        country: data.country,
        transactionType: data.transactionType,
    });
    const transaction = await prisma_1.default.transaction.create({
        data: {
            amount: data.amount,
            merchant: data.merchant,
            city: data.city,
            country: data.country,
            ipAddress: data.ipAddress,
            deviceId: data.deviceId,
            transactionType: data.transactionType,
            riskScore: risk.riskScore,
            status: risk.status,
            user: {
                connect: {
                    id: data.userId,
                },
            },
        },
    });
    await (0, audit_service_1.createAuditLog)({
        userId: data.userId,
        action: client_1.AuditAction.CREATE_TRANSACTION,
        entityType: client_1.EntityType.TRANSACTION,
        entityId: transaction.id,
        description: `Transaction created with risk score ${risk.riskScore}`,
    });
    if (risk.status === client_1.TransactionStatus.FLAGGED ||
        risk.status === client_1.TransactionStatus.CONFIRMED_FRAUD) {
        await (0, case_service_1.createFraudCase)(transaction.id);
        await (0, audit_service_1.createAuditLog)({
            userId: data.userId,
            action: client_1.AuditAction.CREATE_CASE,
            entityType: client_1.EntityType.CASE,
            entityId: transaction.id,
            description: "Fraud investigation case created automatically",
        });
    }
    return {
        transaction,
        risk,
    };
}
async function getAllTransactions() {
    return prisma_1.default.transaction.findMany({
        include: {
            user: true,
            case: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}
async function getTransactionById(id) {
    return prisma_1.default.transaction.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
            case: true,
        },
    });
}
