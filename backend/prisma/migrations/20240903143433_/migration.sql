/*
  Warnings:

  - You are about to drop the column `name` on the `VariantValue` table. All the data in the column will be lost.
  - Added the required column `variantValue` to the `VariantValue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VariantValue" DROP COLUMN "name",
ADD COLUMN     "variantValue" TEXT NOT NULL;
