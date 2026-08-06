import {
  TransactionStatus,
  TransactionType,
} from "@prisma/client";

type RiskInput = {
  amount: number;
  merchant: string;
  country: string;
  transactionType: TransactionType;
};

const TRUSTED_MERCHANTS = [
  "Amazon",
  "Flipkart",
  "Swiggy",
  "Zomato",
  "Uber",
  "Blinkit",
];

export function calculateRisk(transaction: RiskInput) {
  let riskScore = 0;
  const reasons: string[] = [];

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
  if (transaction.transactionType === TransactionType.ATM) {
    riskScore += 15;
    reasons.push("ATM withdrawal");
  }

  // Rule 4 - Unknown Merchant
  const trusted = TRUSTED_MERCHANTS.some(
    merchant =>
      merchant.toLowerCase() === transaction.merchant.toLowerCase()
  );

  if (!trusted) {
    riskScore += 20;
    reasons.push("Unknown merchant");
  }

  let status: TransactionStatus = TransactionStatus.SAFE;

  if (riskScore >= 80) {
    status = TransactionStatus.CONFIRMED_FRAUD;
  } else if (riskScore >= 40) {
    status = TransactionStatus.FLAGGED;
  }

  return {
    riskScore,
    status,
    reasons,
  };
}