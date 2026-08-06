"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionSchema = void 0;
const zod_1 = require("zod");
exports.createTransactionSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    amount: zod_1.z.number().positive(),
    merchant: zod_1.z.string().min(2),
    city: zod_1.z.string().min(2),
    country: zod_1.z.string().min(2),
    ipAddress: zod_1.z.string(),
    deviceId: zod_1.z.string(),
    transactionType: zod_1.z.enum([
        "UPI",
        "CARD",
        "NET_BANKING",
        "ATM",
    ]),
});
