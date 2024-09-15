/*
  Warnings:

  - You are about to drop the column `parentId` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `variantName` on the `VariantValue` table. All the data in the column will be lost.
  - Added the required column `variantNameId` to the `VariantValue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_parentId_fkey";

-- DropForeignKey
ALTER TABLE "VariantValue" DROP CONSTRAINT "VariantValue_variantName_fkey";

-- DropIndex
DROP INDEX "Variant_variantName_key";

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "parentId";

-- AlterTable
ALTER TABLE "VariantValue" DROP COLUMN "variantName",
ADD COLUMN     "variantNameId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "VariantValue" ADD CONSTRAINT "VariantValue_variantNameId_fkey" FOREIGN KEY ("variantNameId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
