import prisma from "../lib/prisma";
import {
  AuditAction,
  EntityType,
  TransactionStatus,
  TransactionType,
} from "@prisma/client";

import { calculateRisk } from "./risk.service";
import { createAuditLog } from "./audit.service";
import { createFraudCase } from "./case.service";

type CreateTransactionDTO = {
  userId: string;
  amount: number;
  merchant: string;
  city: string;
  country: string;
  ipAddress: string;
  deviceId: string;
  transactionType: TransactionType;
};

export async function createTransaction(data: CreateTransactionDTO) {
  const risk = calculateRisk({
    amount: data.amount,
    merchant: data.merchant,
    country: data.country,
    transactionType: data.transactionType,
  });

  const transaction = await prisma.transaction.create({
    data: {
      amount: data.amount,
      merchant: data.merchant,
      city: data.city,
      country: data.country,
      ipAddress: data.ipAddress,
      deviceId: data.deviceId,
      transactionType: data.transactionType,

      riskScore: risk.riskScore,
      status: risk.status,

      user: {
        connect: {
          id: data.userId,
        },
      },
    },
  });

  await createAuditLog({
    userId: data.userId,
    action: AuditAction.CREATE_TRANSACTION,
    entityType: EntityType.TRANSACTION,
    entityId: transaction.id,
    description: `Transaction created with risk score ${risk.riskScore}`,
  });

  if (
    risk.status === TransactionStatus.FLAGGED ||
    risk.status === TransactionStatus.CONFIRMED_FRAUD
  ) {
    await createFraudCase(transaction.id);

    await createAuditLog({
      userId: data.userId,
      action: AuditAction.CREATE_CASE,
      entityType: EntityType.CASE,
      entityId: transaction.id,
      description: "Fraud investigation case created automatically",
    });
  }

  return {
    transaction,
    risk,
  };
}

export async function getAllTransactions() {
  return prisma.transaction.findMany({
    include: {
      user: true,
      case: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getTransactionById(id: string) {
  return prisma.transaction.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      case: true,
    },
  });
}