/*
  Warnings:

  - Changed the type of `entityType` on the `AuditLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('USER', 'TRANSACTION', 'CASE');

-- AlterTable
ALTER TABLE "AuditLog" DROP COLUMN "entityType",
ADD COLUMN     "entityType" "EntityType" NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'INR';
