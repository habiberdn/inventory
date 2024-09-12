/*
  Warnings:

  - Added the required column `codeVariant` to the `VariantValue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VariantValue" ADD COLUMN     "codeVariant" TEXT NOT NULL,
ADD COLUMN     "secondVariant" TEXT;
