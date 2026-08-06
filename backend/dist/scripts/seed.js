"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../src/services/auth.service");
const prisma_1 = __importDefault(require("../src/lib/prisma"));
async function main() {
    await (0, auth_service_1.registerUser)("Admin", "admin@sentinel.com", "admin123", "ADMIN");
    console.log("✅ Admin user created");
}
main()
    .catch((err) => {
    console.error(err);
})
    .finally(async () => {
    await prisma_1.default.$disconnect();
});
