"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getOne = getOne;
exports.assign = assign;
exports.resolve = resolve;
const client_1 = require("@prisma/client");
const case_service_1 = require("../services/case.service");
const audit_service_1 = require("../services/audit.service");
async function getAll(req, res) {
    try {
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 10);
        const search = String(req.query.search ?? "");
        const status = req.query.status;
        const priority = req.query.priority;
        const sort = req.query.sort ?? "desc";
        const result = await (0, case_service_1.getAllCases)(page, limit, search, status, priority, sort);
        return res.status(200).json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to fetch cases",
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
                message: "Case ID is required",
            });
        }
        const fraudCase = await (0, case_service_1.getCaseById)(id);
        if (!fraudCase) {
            return res.status(404).json({
                success: false,
                message: "Case not found",
            });
        }
        return res.status(200).json({
            success: true,
            case: fraudCase,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to fetch case",
        });
    }
}
async function assign(req, res) {
    try {
        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const { analystId } = req.body;
        if (!id || !analystId) {
            return res.status(400).json({
                success: false,
                message: "Case ID and analyst ID are required",
            });
        }
        const updated = await (0, case_service_1.assignCase)(id, analystId);
        const actorId = req.user?.id || analystId;
        await (0, audit_service_1.createAuditLog)({
            userId: actorId,
            action: client_1.AuditAction.ASSIGN_CASE,
            entityType: client_1.EntityType.CASE,
            entityId: id,
            description: `Case investigation assigned to analyst ${analystId}`,
        });
        return res.status(200).json({
            success: true,
            case: updated,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to assign case",
        });
    }
}
async function resolve(req, res) {
    try {
        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Case ID is required",
            });
        }
        const updated = await (0, case_service_1.resolveCase)(id);
        const actorId = req.user?.id || updated.assignedToId;
        if (actorId) {
            await (0, audit_service_1.createAuditLog)({
                userId: actorId,
                action: client_1.AuditAction.RESOLVE_CASE,
                entityType: client_1.EntityType.CASE,
                entityId: id,
                description: `Case ${id} marked as resolved`,
            });
        }
        return res.status(200).json({
            success: true,
            case: updated,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to resolve case",
        });
    }
}
