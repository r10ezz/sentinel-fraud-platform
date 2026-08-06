import prisma from "../lib/prisma";
import { CaseStatus, TransactionStatus } from "@prisma/client";

export async function getDashboardData() {
  const [
    totalTransactions,
    safeTransactions,
    flaggedTransactions,
    confirmedFraud,
    openCases,
    recentTransactions,
    recentCases,
  ] = await Promise.all([
    prisma.transaction.count(),

    prisma.transaction.count({
      where: {
        status: TransactionStatus.SAFE,
      },
    }),

    prisma.transaction.count({
      where: {
        status: TransactionStatus.FLAGGED,
      },
    }),

    prisma.transaction.count({
      where: {
        status: TransactionStatus.CONFIRMED_FRAUD,
      },
    }),

    prisma.case.count({
      where: {
        status: CaseStatus.OPEN,
      },
    }),

    prisma.transaction.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
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
},
    }),

    prisma.case.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        transaction: true,
        assignedTo: true,
      },
    }),
  ]);

  return {
    stats: {
      totalTransactions,
      safeTransactions,
      flaggedTransactions,
      confirmedFraud,
      openCases,
    },

    recentTransactions,

    recentCases,
  };
}