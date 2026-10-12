import prisma from "../lib/prisma";
import { getIO } from "../socket";

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

  const io = getIO();

  io.emit("transaction-created", {
    id: transaction.id,
    merchant: transaction.merchant,
    amount: Number(transaction.amount),
    country: transaction.country,
    city: transaction.city,
    riskScore: transaction.riskScore,
    status: transaction.status,
    createdAt: transaction.createdAt,
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

    io.emit("fraud-alert", {
      id: transaction.id,
      merchant: transaction.merchant,
      amount: Number(transaction.amount),
      country: transaction.country,
      city: transaction.city,
      riskScore: transaction.riskScore,
      status: transaction.status,
      createdAt: transaction.createdAt,
    });
  }

  return {
    transaction,
    risk,
  };
}

export async function getAllTransactions({
  page = 1,
  limit = 10,
  search = "",
  status,
  country,
  sort = "desc",
}: {
  page?: number;
  limit?: number;
  search?: string;
  status?: TransactionStatus;
  country?: string;
  sort?: "asc" | "desc";
}) {
  const skip = (page - 1) * limit;

  const where = {
    ...(search && {
      merchant: {
        contains: search,
        mode: "insensitive" as const,
      },
    }),

    ...(status && { status }),

    ...(country && {
      country: {
        equals: country,
        mode: "insensitive" as const,
      },
    }),
  };

  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        case: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: sort,
      },
    }),

    prisma.transaction.count({
      where,
    }),
  ]);

  return {
    transactions,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getTransactionById(id: string) {
  return prisma.transaction.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      case: true,
    },
  });
}