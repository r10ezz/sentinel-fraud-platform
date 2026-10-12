import prisma from "../lib/prisma";
import { AuditAction, EntityType } from "@prisma/client";

type AuditInput = {
  userId: string;
  action: AuditAction;
  entityType: EntityType;
  entityId: string;
  description: string;
};

export async function createAuditLog(data: AuditInput) {
  return prisma.auditLog.create({
    data: {
      action: data.action,
      entityType: data.entityType,
      entityId: data.entityId,
      description: data.description,
      user: {
        connect: {
          id: data.userId,
        },
      },
    },
  });
}