import { z } from "zod";

export const createTransactionSchema = z.object({
  userId: z.string().uuid(),

  amount: z.number().positive(),

  merchant: z.string().min(2),

  city: z.string().min(2),

  country: z.string().min(2),

  ipAddress: z.string(),

  deviceId: z.string(),

  transactionType: z.enum([
    "UPI",
    "CARD",
    "NET_BANKING",
    "ATM",
  ]),
});