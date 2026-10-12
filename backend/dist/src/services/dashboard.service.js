"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = getDashboardData;
const prisma_1 = __importDefault(require("../lib/prisma"));
const client_1 = require("@prisma/client");
async function getDashboardData() {
    const [totalTransactions, safeTransactions, flaggedTransactions, confirmedFraud, openCases, recentTransactions, recentCases,] = await Promise.all([
        prisma_1.default.transaction.count(),
        prisma_1.default.transaction.count({
            where: {
                status: client_1.TransactionStatus.SAFE,
            },
        }),
        prisma_1.default.transaction.count({
            where: {
                status: client_1.TransactionStatus.FLAGGED,
            },
        }),
        prisma_1.default.transaction.count({
            where: {
                status: client_1.TransactionStatus.CONFIRMED_FRAUD,
            },
        }),
        prisma_1.default.case.count({
            where: {
                status: client_1.CaseStatus.OPEN,
            },
        }),
        prisma_1.default.transaction.findMany({
            take: 5,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    },
                },
            },
        }),
        prisma_1.default.case.findMany({
            take: 5,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                transaction: true,
                assignedTo: true,
            },
        }),
    ]);
    return {
        stats: {
            totalTransactions,
            safeTransactions,
            flaggedTransactions,
            confirmedFraud,
            openCases,
        },
        recentTransactions,
        recentCases,
    };
}
