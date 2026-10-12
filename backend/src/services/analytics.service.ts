import prisma from "../lib/prisma";
import { TransactionStatus } from "@prisma/client";

export async function getAnalytics() {
  const [
    totalTransactions,
    safeTransactions,
    flaggedTransactions,
    confirmedFraud,
    totalCases,
    openCases,
    resolvedCases,
    transactions,
    recentTransactions,
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

    prisma.case.count(),

    prisma.case.count({
      where: {
        status: "OPEN",
      },
    }),

    prisma.case.count({
      where: {
        status: "RESOLVED",
      },
    }),

    prisma.transaction.findMany({
      select: {
        riskScore: true,
        country: true,
        merchant: true,
        status: true,
        amount: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    }),

    prisma.transaction.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  // Risk buckets

  const riskDistribution = {
    low: 0,
    medium: 0,
    high: 0,
  };

  // Country stats

  const countryMap: Record<string, number> = {};

  // Merchant stats

  const merchantMap: Record<string, number> = {};

  // Daily stats

  const dailyMap: Record<string, number> = {};

  for (const tx of transactions) {
    // Risk

    if (tx.riskScore < 50) riskDistribution.low++;
    else if (tx.riskScore < 80) riskDistribution.medium++;
    else riskDistribution.high++;

    // Country

    countryMap[tx.country] =
      (countryMap[tx.country] || 0) + 1;

    // Merchant

    merchantMap[tx.merchant] =
      (merchantMap[tx.merchant] || 0) + 1;

    // Daily

    const day = tx.createdAt.toISOString().split("T")[0];

    dailyMap[day] =
      (dailyMap[day] || 0) + 1;
  }

  const topCountries = Object.entries(countryMap)
    .map(([country, count]) => ({
      country,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topMerchants = Object.entries(merchantMap)
    .map(([merchant, count]) => ({
      merchant,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const dailyTransactions = Object.entries(dailyMap).map(
    ([date, count]) => ({
      date,
      count,
    })
  );

  return {
    overview: {
      totalTransactions,
      safeTransactions,
      flaggedTransactions,
      confirmedFraud,

      totalCases,
      openCases,
      resolvedCases,
    },

    riskDistribution,

    topCountries,

    topMerchants,

    dailyTransactions,

    recentTransactions,
  };
}