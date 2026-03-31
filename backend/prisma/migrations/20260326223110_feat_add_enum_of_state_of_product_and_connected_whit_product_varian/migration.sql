-- CreateEnum
CREATE TYPE "ProductCondition" AS ENUM ('NEW', 'REFURBISHED');

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "condition" "ProductCondition" NOT NULL DEFAULT 'NEW';
