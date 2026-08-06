"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = getDashboard;
const dashboard_service_1 = require("../services/dashboard.service");
async function getDashboard(req, res) {
    try {
        const dashboard = await (0, dashboard_service_1.getDashboardData)();
        return res.json({
            success: true,
            ...dashboard,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to load dashboard",
        });
    }
}
