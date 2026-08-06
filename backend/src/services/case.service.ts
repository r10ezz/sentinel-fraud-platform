import prisma from "../lib/prisma";
import { CaseStatus, Priority } from "@prisma/client";

/**
 * Automatically create a fraud investigation case
 */
export async function createFraudCase(transactionId: string) {
  return prisma.case.create({
    data: {
      title: "Suspicious Transaction",
      description:
        "Automatically created because the transaction exceeded the fraud threshold.",

      priority: Priority.HIGH,

      transaction: {
        connect: {
          id: transactionId,
        },
      },
    },
  });
}

/**
 * Get all fraud cases
 */
export async function getAllCases() {
  return prisma.case.findMany({
    include: {
      transaction: true,
      assignedTo: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Get a single case
 */
export async function getCaseById(id: string) {
  return prisma.case.findUnique({
    where: {
      id,
    },
    include: {
      transaction: true,
      assignedTo: true,
    },
  });
}

/**
 * Assign a case to an analyst
 */
export async function assignCase(
  caseId: string,
  analystId: string
) {
  return prisma.case.update({
    where: {
      id: caseId,
    },
    data: {
      assignedTo: {
        connect: {
          id: analystId,
        },
      },
      status: CaseStatus.IN_REVIEW,
    },
  });
}

/**
 * Resolve a case
 */
export async function resolveCase(caseId: string) {
  return prisma.case.update({
    where: {
      id: caseId,
    },
    data: {
      status: CaseStatus.RESOLVED,
    },
  });
}