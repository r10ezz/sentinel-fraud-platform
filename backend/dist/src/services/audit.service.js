"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuditLog = createAuditLog;
const prisma_1 = __importDefault(require("../lib/prisma"));
async function createAuditLog(data) {
    return prisma_1.default.auditLog.create({
        data: {
            action: data.action,
            entityType: data.entityType,
            entityId: data.entityId,
            description: data.description,
            user: {
                connect: {
                    id: data.userId,
                },
            },
        },
    });
}
