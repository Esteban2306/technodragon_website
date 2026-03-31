/*
  Warnings:

  - You are about to alter the column `price` on the `CatalogItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - A unique constraint covering the columns `[productId,variantId]` on the table `CatalogItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `CatalogItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CatalogItem_variantId_key";

-- AlterTable
ALTER TABLE "CatalogItem" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "CatalogItem_productId_variantId_key" ON "CatalogItem"("productId", "variantId");
