"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFraudCase = createFraudCase;
exports.getAllCases = getAllCases;
exports.getCaseById = getCaseById;
exports.assignCase = assignCase;
exports.resolveCase = resolveCase;
const prisma_1 = __importDefault(require("../lib/prisma"));
const client_1 = require("@prisma/client");
/**
 * Automatically create a fraud investigation case
 */
async function createFraudCase(transactionId) {
    return prisma_1.default.case.create({
        data: {
            title: "Suspicious Transaction",
            description: "Automatically created because the transaction exceeded the fraud threshold.",
            priority: client_1.Priority.HIGH,
            transaction: {
                connect: {
                    id: transactionId,
                },
            },
        },
    });
}
/**
 * Get all fraud cases
 */
async function getAllCases(page = 1, limit = 10, search = "", status, priority, sort = "desc") {
    const where = {
        ...(status && { status }),
        ...(priority && { priority }),
        ...(search && {
            OR: [
                {
                    title: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    transaction: {
                        merchant: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
            ],
        }),
    };
    const [cases, total] = await Promise.all([
        prisma_1.default.case.findMany({
            where,
            include: {
                transaction: true,
                assignedTo: true,
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                createdAt: sort,
            },
        }),
        prisma_1.default.case.count({
            where,
        }),
    ]);
    return {
        cases,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
}
/**
 * Get a single case
 */
async function getCaseById(id) {
    return prisma_1.default.case.findUnique({
        where: {
            id,
        },
        include: {
            transaction: true,
            assignedTo: true,
        },
    });
}
/**
 * Assign a case to an analyst
 */
async function assignCase(caseId, analystId) {
    return prisma_1.default.case.update({
        where: {
            id: caseId,
        },
        data: {
            assignedTo: {
                connect: {
                    id: analystId,
                },
            },
            status: client_1.CaseStatus.IN_REVIEW,
        },
    });
}
/**
 * Resolve a case
 */
async function resolveCase(caseId) {
    return prisma_1.default.case.update({
        where: {
            id: caseId,
        },
        data: {
            status: client_1.CaseStatus.RESOLVED,
        },
    });
}
