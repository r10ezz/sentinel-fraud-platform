"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.getMe = getMe;
const auth_service_1 = require("../services/auth.service");
const user_service_1 = require("../services/user.service");
const audit_service_1 = require("../services/audit.service");
const client_1 = require("@prisma/client");
async function login(req, res) {
    try {
        const { email, password } = req.body ?? {};
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }
        const result = await (0, auth_service_1.loginUser)(email, password);
        // Audit log successful login
        await (0, audit_service_1.createAuditLog)({
            userId: result.user.id,
            action: client_1.AuditAction.LOGIN,
            entityType: client_1.EntityType.USER,
            entityId: result.user.id,
            description: `User ${result.user.name} (${result.user.role}) logged in successfully`,
        });
        return res.status(200).json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: error instanceof Error ? error.message : "Login failed",
        });
    }
}
async function getMe(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const user = await (0, user_service_1.findUserById)(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const { password: _, ...safeUser } = user;
        return res.status(200).json({
            success: true,
            user: safeUser,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to fetch user profile",
        });
    }
}
