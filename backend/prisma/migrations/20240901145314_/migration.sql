/*
  Warnings:

  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prize` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_product_name_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "prize" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Stock";

-- CreateTable
CREATE TABLE "Variant" (
    "id" SERIAL NOT NULL,
    "variantName" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantValue" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "variantName" TEXT NOT NULL,

    CONSTRAINT "VariantValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Variant_id_key" ON "Variant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Variant_variantName_key" ON "Variant"("variantName");

-- CreateIndex
CREATE UNIQUE INDEX "VariantValue_id_key" ON "VariantValue"("id");

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_product_name_fkey" FOREIGN KEY ("product_name") REFERENCES "Product"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantValue" ADD CONSTRAINT "VariantValue_variantName_fkey" FOREIGN KEY ("variantName") REFERENCES "Variant"("variantName") ON DELETE RESTRICT ON UPDATE CASCADE;
