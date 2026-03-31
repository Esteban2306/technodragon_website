/*
  Warnings:

  - You are about to drop the column `image` on the `CatalogItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CatalogItem" DROP COLUMN "image",
ADD COLUMN     "images" JSONB;
