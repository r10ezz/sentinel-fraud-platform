"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const user_service_1 = require("./user.service");
async function registerUser(name, email, password, role = "VIEWER") {
    const existingUser = await (0, user_service_1.findUserByEmail)(email);
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    return (0, user_service_1.createUser)({
        name,
        email,
        password: hashedPassword,
        role,
    });
}
async function loginUser(email, password) {
    const user = await (0, user_service_1.findUserByEmail)(email);
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        role: user.role,
    }, env_1.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    // Remove password before sending user to frontend
    const { password: _, ...safeUser } = user;
    return {
        token,
        user: safeUser,
    };
}
