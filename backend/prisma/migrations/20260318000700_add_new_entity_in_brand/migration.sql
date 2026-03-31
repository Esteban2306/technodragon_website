/*
  Warnings:

  - You are about to drop the column `updatedAd` on the `Category` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "updatedAd",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
