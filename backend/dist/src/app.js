"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const case_routes_1 = __importDefault(require("./routes/case.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const audit_log_routes_1 = __importDefault(require("./routes/audit-log.routes"));
const simulation_routes_1 = __importDefault(require("./routes/simulation.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: env_1.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/transactions", transaction_routes_1.default);
app.use("/api/dashboard", dashboard_routes_1.default);
app.use("/api/cases", case_routes_1.default);
app.use("/api/analytics", analytics_routes_1.default);
app.use("/api/audit-logs", audit_log_routes_1.default);
app.use("/api/simulation", simulation_routes_1.default);
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Fraud Monitoring API is running 🚀",
    });
});
exports.default = app;
