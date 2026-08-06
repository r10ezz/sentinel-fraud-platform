"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const auth_service_1 = require("../services/auth.service");
async function login(req, res) {
    console.log("===== LOGIN REQUEST =====");
    console.log("Method:", req.method);
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    try {
        const { email, password } = req.body ?? {};
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
                body: req.body,
            });
        }
        const result = await (0, auth_service_1.loginUser)(email, password);
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
