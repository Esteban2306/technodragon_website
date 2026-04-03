/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropIndex
DROP INDEX "Cart_sessionId_isActive_idx";

-- DropIndex
DROP INDEX "Cart_sessionId_key";

-- DropIndex
DROP INDEX "Cart_userId_idx";

-- DropIndex
DROP INDEX "Cart_userId_isActive_idx";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "sessionId",
DROP COLUMN "userId";
