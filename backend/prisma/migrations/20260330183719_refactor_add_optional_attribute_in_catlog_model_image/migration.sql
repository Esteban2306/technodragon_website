/*
  Warnings:

  - The `image` column on the `CatalogItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[variantId]` on the table `CatalogItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CatalogItem" DROP COLUMN "image",
ADD COLUMN     "image" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "CatalogItem_variantId_key" ON "CatalogItem"("variantId");
