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
async function getAllCases() {
    return prisma_1.default.case.findMany({
        include: {
            transaction: true,
            assignedTo: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
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
