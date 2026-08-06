"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRisk = calculateRisk;
const client_1 = require("@prisma/client");
const TRUSTED_MERCHANTS = [
    "Amazon",
    "Flipkart",
    "Swiggy",
    "Zomato",
    "Uber",
    "Blinkit",
];
function calculateRisk(transaction) {
    let riskScore = 0;
    const reasons = [];
    // Rule 1 - High Amount
    if (transaction.amount > 50000) {
        riskScore += 30;
        reasons.push("High transaction amount");
    }
    // Rule 2 - International Transaction
    if (transaction.country.toLowerCase() !== "india") {
        riskScore += 25;
        reasons.push("International transaction");
    }
    // Rule 3 - ATM Withdrawal
    if (transaction.transactionType === client_1.TransactionType.ATM) {
        riskScore += 15;
        reasons.push("ATM withdrawal");
    }
    // Rule 4 - Unknown Merchant
    const trusted = TRUSTED_MERCHANTS.some(merchant => merchant.toLowerCase() === transaction.merchant.toLowerCase());
    if (!trusted) {
        riskScore += 20;
        reasons.push("Unknown merchant");
    }
    let status = client_1.TransactionStatus.SAFE;
    if (riskScore >= 80) {
        status = client_1.TransactionStatus.CONFIRMED_FRAUD;
    }
    else if (riskScore >= 40) {
        status = client_1.TransactionStatus.FLAGGED;
    }
    return {
        riskScore,
        status,
        reasons,
    };
}
